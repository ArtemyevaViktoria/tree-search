import { IEmployee } from "src/app/interfaces/employee.interfaces";

/**
 * Интерфейс, описывающий состояние пользовательского интерфейса для отдела.
 * Включает свойства, которые управляют отображением отдела на фронтенде.
 */
export interface IDepartmentState {
  // Флаг, указывающий, развернут ли отдел для отображения поддотделов и позиций
  isExpanded: boolean;

  // Уровень z-index для узлов дерева, представляющих отделы
  departmentZIndex?: number;
}

/**
 * Модель данных отдела, получаемая с бэкенда.
 * Содержит информацию об отделе, его сотрудниках и поддотделах.
 */
export interface IDepartmentDTO<T = any> {
  // Уникальный идентификатор узла
  nodeId: string;

  // Название отдела
  name: string;

  // Уровень вложенности элемента
  hierarchyLevel: number;

  // Список позиций сотрудников, относящихся к этому отделу
  positions?: IEmployee[];

  // Список поддотделов, относящихся к этому отделу
  subDepartments?: T[];
}

/** Объединенный интерфейс, который расширяет как данные отдела с бэкенда, так и состояние пользовательского интерфейса. */
export interface IDepartment<T> extends IDepartmentDTO<T>, IDepartmentState {}

/** Определение типа, представляющего отдел с поддотделами того же типа */
export type DepartmentType = IDepartment<DepartmentType>;
