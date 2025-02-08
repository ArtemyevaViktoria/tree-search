import { FormControl } from "@angular/forms";

/** Интерфейс для объектов, поддерживающих фильтрацию сотрудников */
export interface IFilterableEmployees {
  isHighlightPredicateSearchable(): boolean;
}

/** Описывает структуру формы фильтрации */
export interface IFilterForm {
  lastName: FormControl<string | null>;
  position: FormControl<string | null>;
}

/** Интерфейс, описывающий критерии фильтрации сотрудников */
export interface IFilterEmployee {
  lastName: string | null;
  position: string | null;
}
