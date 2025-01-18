import { Injectable, inject, WritableSignal, signal, Signal } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DepartmentDataService } from "src/app/services/data/department-data.service";
import { Department } from "src/app/models/department.model";
import { IDepartmentDTO } from "src/app/interfaces/department.interfaces";
import { IEmployee } from "src/app/interfaces/employee.interfaces";

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

  /** Установка выбранной позиции */
  public setSelectedPosition(position: IEmployee) {
    this._selectedPosition.set(position);
  }
}
