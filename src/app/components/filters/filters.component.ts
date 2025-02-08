import { Component, inject } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DepartmentStoreService } from "src/app/services/store/department-store.service";
import { IFilterForm } from "src/app/interfaces/filter.interfaces";

@Component({
  selector: "app-filters",
  imports: [ReactiveFormsModule],
  templateUrl: "./filters.component.html",
  styleUrl: "./filters.component.scss",
  standalone: true,
})
export class FiltersComponent {
  /** Сервис хранилища для управления состоянием отделов */
  public _departmentStoreService: DepartmentStoreService = inject(DepartmentStoreService);

  /** Форма фильтрации */
  public form: FormGroup<IFilterForm> = this._departmentStoreService.getFilterForm();
}
