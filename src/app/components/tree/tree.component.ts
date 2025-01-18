import { ChangeDetectionStrategy, Component, inject, Input, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Department } from "src/app/models/department.model";
import { IEmployee } from "src/app/interfaces/employee.interfaces";
import { DepartmentStoreService } from "src/app/services/store/department-store.service";

@Component({
  selector: "app-tree",
  imports: [CommonModule],
  templateUrl: "./tree.component.html",
  styleUrl: "./tree.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  /** Сервис хранилища для управления состоянием отедлов */
  private _departmentStoreService: DepartmentStoreService = inject(DepartmentStoreService);

  /** Данные отдела */
  @Input() department: Department = {} as Department;

  /** Выбранная позиция */
  public selectedPosition: Signal<IEmployee | null> = this._departmentStoreService.selectedPosition;

  /** Изменяет состояние развернутости указанного отдела */
  public toggleExpand(department: Department): void {
    department.isExpanded = !department.isExpanded;
  }

  /** Обработчик клика по строке позиции */
  public onPositionClick(position: IEmployee) {
    this._departmentStoreService.setSelectedPosition(position);
  }
}
