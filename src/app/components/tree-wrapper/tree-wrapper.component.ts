import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { TreeComponent } from "src/app/components/tree/tree.component";
import { DepartmentStoreService } from "src/app/services/store/department-store.service";
import { Department, setZIndexUsingBFS } from "src/app/models/department.model";

@Component({
  selector: "app-tree-wrapper",
  imports: [CommonModule, TreeComponent],
  templateUrl: "./tree-wrapper.component.html",
  styleUrl: "./tree-wrapper.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeWrapperComponent implements OnInit {
  /** Внедрение DestroyRef для автоматического управления отписками при уничтожении компонента */
  private destroyRef: DestroyRef = inject(DestroyRef);

  /** Сервис хранилища для управления состоянием отедлов */
  private _departmentStoreService: DepartmentStoreService = inject(
    DepartmentStoreService,
  );

  /** Записываемый сигнал для массива Department */
  public departments: WritableSignal<Department[]> = signal<Department[]>([]);

  ngOnInit(): void {
    this._departmentStoreService
      .getDepartments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Department[]) => {
        this.departments.set(data);

        // Присваиваем z-index для каждого отдела в дереве, выполняя обход в ширину
        this.departments().forEach((item: Department) =>
          setZIndexUsingBFS(item),
        );
      });
  }
}
