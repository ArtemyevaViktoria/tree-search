import { DepartmentType, IDepartment } from "src/app/interfaces/department.interfaces";
import { IEmployee } from "src/app/interfaces/employee.interfaces";
import { signal, WritableSignal } from "@angular/core";

/** Инициализирует начальное значение z-index для узлов дерева, начиная с 100.
 * Каждый новый узел будет получать уменьшенное значение z-index, чтобы обеспечить правильный порядок наложения элементов.
 */
let currentZIndex: number = 100;

/**
 * Класс, реализующий интерфейс IDepartment.
 * @see IDepartment
 */
export class Department implements IDepartment<Department> {
  /** @inheritdoc */
  nodeId!: string;

  /** @inheritdoc */
  name!: string;

  /** @inheritdoc */
  hierarchyLevel!: number;

  /** @inheritdoc */
  positions?: IEmployee[];

  /** @inheritdoc */
  subDepartments?: Department[];

  /** @inheritdoc */
  isExpanded: WritableSignal<boolean> = signal(false);

  /** @inheritdoc */
  departmentZIndex: number = 0;

  constructor(init?: Partial<DepartmentType>) {
    Object.assign(this, init);

    // Установка isExpanded в true для корневых узлов (уровень вложенности 0)
    this.isExpanded.set(this.hierarchyLevel === 0);

    // Инициализация подотделов, если они указаны в объекте init
    this.subDepartments = init?.subDepartments?.map((subDep) => new Department(subDep)) ?? [];
  }
}

/**
 * Функция выполняет обход дерева в ширину (BFS) для присвоения значений z-index узлам.
 *
 * @param {Department} root - Корневой узел дерева.
 *
 * Эта функция использует очередь для обхода каждого уровня дерева, начиная с корневого узла.
 * Значение z-index уменьшается для каждого последующего узла, обеспечивая правильный порядок наложения.
 * Дочерние узлы добавляются в очередь для дальнейшей обработки.
 */
export function setZIndexUsingBFS(root: Department) {
  const queue: Department[] = [];
  queue.push(root);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node) {
      node.departmentZIndex = currentZIndex--;
      node.subDepartments?.forEach((child) => queue.push(child));
    }
  }
}

/**
 * Метод для поиска родительского отдела по nodeId дочернего отдела.
 * @param departments - массив отделов.
 * @param nodeId - идентификатор дочернего отдела.
 * @returns родительский отдел или undefined, если не найден.
 */
export function getParentDepartment(
  departments: Department[],
  nodeId: string,
): Department | undefined {
  for (const department of departments) {
    if (department.subDepartments) {
      for (const subDepartment of department.subDepartments) {
        if (subDepartment.nodeId === nodeId) {
          return department;
        }

        const foundParent = getParentDepartment(department.subDepartments, nodeId);
        if (foundParent) {
          return foundParent;
        }
      }
    }
  }
  return undefined;
}
