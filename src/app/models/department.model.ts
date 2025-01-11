import { DepartmentType, IDepartment } from "src/app/interfaces/department.interfaces";
import { IEmployee } from "src/app/interfaces/employee.interfaces";

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
  isExpanded: boolean = false;

  /** @inheritdoc */
  departmentZIndex: number = 0;

  constructor(init?: Partial<DepartmentType>) {
    Object.assign(this, init);

    // Установка isExpanded в true для корневых узлов (уровень вложенности 0)
    this.isExpanded = this.hierarchyLevel === 0;

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
