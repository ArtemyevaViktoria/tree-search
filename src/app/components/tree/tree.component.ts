import { ChangeDetectionStrategy, Component, inject, Input, Signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Department } from "src/app/models/department.model";
import { IEmployee } from "src/app/interfaces/employee.interfaces";
import { DepartmentStoreService } from "src/app/services/store/department-store.service";
import { ToInitialPipe } from "src/app/pipes/to-initial.pipe";
import { HighlightPipe } from "src/app/pipes/highlight.pipe";
import { Observable } from "rxjs";
import { IFilterEmployee } from "src/app/interfaces/filter.interfaces";

@Component({
  selector: "app-tree",
  imports: [CommonModule, ToInitialPipe, HighlightPipe],
  templateUrl: "./tree.component.html",
  styleUrl: "./tree.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  /** Сервис хранилища для управления состоянием отделов */
  public departmentStoreService: DepartmentStoreService = inject(DepartmentStoreService);

  /** Данные отдела */
  @Input() department: Department = {} as Department;

  /** Observable для доступа к фильтру */
  public filter$: Observable<IFilterEmployee> = this.departmentStoreService.getFilter();

  /** Выбранная позиция */
  public selectedPosition: Signal<IEmployee | null> = this.departmentStoreService.selectedPosition;

  /** Изменяет состояние развернутости указанного отдела */
  public toggleExpand(department: Department): void {
    department.isExpanded.set(!department.isExpanded());
  }

  /** Обработчик клика по строке позиции */
  public onPositionClick(position: IEmployee) {
    this.departmentStoreService.setSelectedPosition(position);
  }
}
