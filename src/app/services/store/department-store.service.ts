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

  /** Форма фильтрации */
  private readonly _filterForm!: FormGroup<IFilterForm>;

  /** BehaviorSubject для формы фильтрации */
  private _filterSubject$: BehaviorSubject<IFilterEmployee> = new BehaviorSubject<IFilterEmployee>({
    lastName: "",
    position: "",
  });

  /**  Создание и подписка на изменения формы фильтра */
  constructor(private _fb: FormBuilder) {
    this._filterForm = this._fb.group({
      lastName: ["", [Validators.minLength(2)]],
      position: ["", [Validators.minLength(2)]],
    });

    this._filterForm.valueChanges.subscribe((values) => {
      this._filterSubject$.next(values as IFilterEmployee);
    });
  }

  /**  Observable для доступа к состоянию фильтра */
  public filter$: Observable<IFilterEmployee> = this._filterSubject$.asObservable();

  /**
   * Возвращает true, если форма фильтрации валидна, иначе false.
   * @returns boolean
   */
  public isFilterFormValid(): boolean {
    return this._filterForm.valid;
  }

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
    return this._filterForm;
  }

  /** Получение Observable фильтра */
  public getFilter(): Observable<IFilterEmployee> {
    return this.filter$;
  }

  /** Установка выбранной позиции */
  public setSelectedPosition(position: IEmployee): void {
    this._selectedPosition.set(position);
  }
}
