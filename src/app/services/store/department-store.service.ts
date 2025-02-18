import { Injectable, inject, WritableSignal, signal, Signal } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DepartmentDataService } from "src/app/services/data/department-data.service";
import { Department } from "src/app/models/department.model";
import { IDepartmentDTO } from "src/app/interfaces/department.interfaces";
import { IEmployee } from "src/app/interfaces/employee.interfaces";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IFilterEmployee, IFilterForm } from "src/app/interfaces/filter.interfaces";

/**
 * Сервис хранилища для управления состоянием отделов.
 */
@Injectable({
  providedIn: "root",
})
export class DepartmentStoreService {
  /** Сервис для получения данных отедлов с бэкенда */
  private _departmentDataService: DepartmentDataService = inject(DepartmentDataService);

  /** Выбранная позиция */
  private _selectedPosition: WritableSignal<IEmployee | null> = signal(null);

  /** BehaviorSubject для формы фильтрации */
  private _filterSubject$: BehaviorSubject<IFilterEmployee> = new BehaviorSubject<IFilterEmployee>({
    lastName: "",
    position: "",
  });

  /** Форма фильтрации */
  public readonly filterForm!: FormGroup<IFilterForm>;

  /** Признак изменения формы фильтрации */
  public filterFormChanged: WritableSignal<boolean> = signal(false);

  /** Создание и подписка на изменения формы фильтра */
  constructor(private _fb: FormBuilder) {
    this.filterForm = this._fb.group({
      lastName: ["", [Validators.minLength(2)]],
      position: ["", [Validators.minLength(2)]],
    });

    this.filterForm.valueChanges.subscribe((values) => {
      this._filterSubject$.next(values as IFilterEmployee);
      this.filterFormChanged.set(true);
    });
  }

  /** Observable для доступа к состоянию фильтра */
  public filter$: Observable<IFilterEmployee> = this._filterSubject$.asObservable();

  /** Выбранная позиция */
  public readonly selectedPosition: Signal<IEmployee | null> = this._selectedPosition.asReadonly();

  /**
   * Получает данные отедлов с бэкенда и преобразует их в объекты Department.
   * @returns Observable массив объектов Department.
   */
  public getDepartments(): Observable<Department[]> {
    return this._departmentDataService
      .getDepartments()
      .pipe(
        map((departmentDTO: IDepartmentDTO[]) => departmentDTO.map((dto) => new Department(dto))),
      );
  }

  /** Получение формы фильтрации */
  public getFilterForm(): FormGroup<IFilterForm> {
    return this.filterForm;
  }

  /** Получение Observable фильтра */
  public getFilter(): Observable<IFilterEmployee> {
    return this.filter$;
  }

  /**
   * Возвращает true, если форма фильтрации валидна, иначе false.
   * @returns boolean
   */
  public isFilterFormValid(): boolean {
    return this.filterForm.valid;
  }

  /** Устанавливает признак изменения формы фильтрации */
  public setFilterFormChanged(vl: boolean) {
    this.filterFormChanged.set(vl);
  }

  /** Установка выбранной позиции */
  public setSelectedPosition(position: IEmployee): void {
    this._selectedPosition.set(position);
  }
}
