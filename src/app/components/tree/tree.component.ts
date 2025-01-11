import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Department } from "src/app/models/department.model";

@Component({
  selector: "app-tree",
  imports: [CommonModule],
  templateUrl: "./tree.component.html",
  styleUrl: "./tree.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  /** Данные отдела */
  @Input() department: Department = {} as Department;

  /** Изменяет состояние развернутости указанного отдела */
  public toggleExpand(department: Department): void {
    department.isExpanded = !department.isExpanded;
  }
}
