/**
 * Интерфейс сотрудника компании.
 * Содержит основные атрибуты, связанные с личной информацией, должностью, департаментом и др. данными.
 */
export interface IEmployee {
  // Уникальный идентификатор узла сотрудника
  nodeId: string;

  // Имя
  firstName: string;

  // Фамилия
  lastName: string;

  // Отчество
  middleName?: string;

  // Должность
  position: string;

  // Уникальный идентификатор родительского узла
  parentNodeId: string;

  // Признак главы отдела
  headOfDepartment: boolean;

  // Электронная почта
  email: string;

  // Дата приема на работу
  hireDate: Date;

  // Заработная плата
  salary: number;
}

/**
 * Сотрудник и его элемент DOM.
 * Используется для перемещения по сотрудникам (при клике на enter), соответствующих условиям фильтров.
 */
export interface IEmployeeElementContext {
  // Данные сотрудника
  employee: IEmployee;

  // Элемент DOM
  elem: HTMLElement;
}
