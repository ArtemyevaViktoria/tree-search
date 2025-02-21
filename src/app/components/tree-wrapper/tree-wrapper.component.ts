import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { TreeComponent } from "src/app/components/tree/tree.component";
import { DepartmentStoreService } from "src/app/services/store/department-store.service";
import {
  Department,
  getParentDepartment,
  setZIndexUsingBFS,
} from "src/app/models/department.model";
import { FiltersComponent } from "src/app/components/filters/filters.component";
import { IEmployee, IEmployeeElementContext } from "src/app/interfaces/employee.interfaces";
import { Subject } from "rxjs";

@Component({
  selector: "app-tree-wrapper",
  imports: [CommonModule, TreeComponent, FiltersComponent],
  templateUrl: "./tree-wrapper.component.html",
  styleUrl: "./tree-wrapper.component.scss",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeWrapperComponent implements OnInit {
  /** Внедрение DestroyRef для автоматического управления отписками при уничтожении компонента */
  private destroyRef: DestroyRef = inject(DestroyRef);

  /** Сервис хранилища для управления состоянием отедлов */
  private _departmentStoreService: DepartmentStoreService = inject(DepartmentStoreService);

  /** Текущий индекс перемещения по найденным позициям */
  private _currentIndex: number = 0;

  /** Subject, для отслежтивания готовности перехода по найденным сотрудникам */
  private _transitionReadySubject$ = new Subject<void>();

  /** Сотрудники, соответствующие условиям фильтров */
  private _employeesToSearch: IEmployee[] = [];

  /**
   * Список сотрудников, соответствующих условиям фильтров.
   * Содержит данные сотрудника и его элемент DOM.
   */
  private _employeeElementsToSearch: IEmployeeElementContext[] = [];

  /** Записываемый сигнал для массива Department */
  public departments: WritableSignal<Department[]> = signal<Department[]>([]);

  /** Текущий год */
  public currentYear!: number;

  ngOnInit(): void {
    this._departmentStoreService
      .getDepartments()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Department[]) => {
        this.departments.set(data);

        // Присваиваем z-index для каждого отдела в дереве, выполняя обход в ширину
        this.departments().forEach((item: Department) => setZIndexUsingBFS(item));
      });

    this._transitionReadySubject$
      .asObservable()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this._startFilteredEmployeeTransition();
      });

    this.currentYear = new Date().getFullYear();
  }

  /** Обработчик нажатия клавиши Enter */
  @HostListener("document:keydown.enter", ["$event"])
  handleEnterKey() {
    if (
      // Если форма фильтрации валидна и была изменена
      this._departmentStoreService.isFilterFormValid() &&
      this._departmentStoreService.filterFormChanged()
    ) {
      this._departmentStoreService.setFilterFormChanged(false);

      this._prepareSearchNavigation(this.departments());
    } else if (
      // Если форма фильтрации валидна и есть элементы для поиска
      this._departmentStoreService.isFilterFormValid() &&
      this._employeeElementsToSearch.length > 0
    ) {
      this._scrollIntoElement();
    }
  }

  /** Выполняет поиск DOM-элементов для отфильтрованных сотрудников и запускает прокрутку к первому из них */
  private _startFilteredEmployeeTransition() {
    this._employeeElementsToSearch = [];

    setTimeout(() => {
      this._employeeElementsToSearch = this._employeesToSearch
        .map((position): IEmployeeElementContext | null => {
          const element = document.querySelector(`[data-nodeId="${position.nodeId}"]`);
          return element ? { employee: position, elem: element as HTMLElement } : null;
        })
        .filter((item): item is IEmployeeElementContext => item !== null);

      if (this._employeeElementsToSearch.length) {
        this._scrollIntoElement();
      }
    }, 0);
  }

  /** Выполняет прокрутку к следующему сотруднику, соответстсвующему условиям фильтров */
  private _scrollIntoElement() {
    this._employeeElementsToSearch[this._currentIndex].elem.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    this._departmentStoreService.setSelectedPosition(
      this._employeeElementsToSearch[this._currentIndex].employee,
    );

    this._currentIndex = (this._currentIndex + 1) % this._employeeElementsToSearch.length;
  }

  /**
   * Обновляет состояние дерева для раскрытия узлов, содержащих позиции, соответствующие поиску.
   * Затем отправляет событие готовности перехода по найденным сотрудникам.
   *
   * @param departments Массив отделов для обработки.
   */
  private _prepareSearchNavigation(departments: Department[]): void {
    this._employeesToSearch = [];

    const updatedDepartments = departments.map((department) =>
      this._checkPositionsStartExpandedBySearch(department),
    );

    this.departments.set(updatedDepartments);

    this._transitionReadySubject$.next();
  }

  /**
   * Проверяет позиции на соответствие фильтрам.
   * В случае соответствия - запускает раскрытие всех вышестоящих родительских узлов рекурсивно.
   */
  private _checkPositionsStartExpandedBySearch(department: Department): Department {
    if (department.positions) {
      department.positions.forEach((position) => {
        if (
          (this._departmentStoreService.filterForm.controls.lastName.value &&
            position.lastName
              ?.toLowerCase()
              .includes(
                this._departmentStoreService.filterForm.controls.lastName.value?.toLowerCase(),
              )) ||
          (this._departmentStoreService.filterForm.controls.position.value &&
            position.position
              ?.toLowerCase()
              .includes(
                this._departmentStoreService.filterForm.controls.position.value?.toLowerCase(),
              ))
        ) {
          this._employeesToSearch.push(position);

          department.isExpanded.set(true);

          let parentDepartment: Department | undefined = getParentDepartment(
            this.departments(),
            department.nodeId,
          );

          // Рекурсивно раскрываем все родительские узлы, пока не достигнем нулевого уровня вложенности
          while (parentDepartment && parentDepartment.hierarchyLevel !== 0) {
            parentDepartment.isExpanded.set(true);
            parentDepartment = getParentDepartment(this.departments(), parentDepartment.nodeId);
          }

          // Устанавливаем isExpanded для нулевого уровня вложенности
          if (parentDepartment) {
            parentDepartment.isExpanded.set(true);
          }
        }
      });
    }

    if (department.subDepartments) {
      department.subDepartments = department.subDepartments.map((subDepartment) =>
        this._checkPositionsStartExpandedBySearch(subDepartment),
      );
    }

    return department;
  }
}
