import { inject, Pipe, PipeTransform } from "@angular/core";
import { DepartmentStoreService } from "src/app/services/store/department-store.service";

@Pipe({
  name: "highlight",
  standalone: true,
  pure: false,
})
export class HighlightPipe implements PipeTransform {
  /** Сервис хранилища для управления состоянием отедлов */
  private _departmentStoreService: DepartmentStoreService = inject(DepartmentStoreService);

  /** Подсвечивание части строки соответствующей предикату
   * @param value - значение для подсветки
   * @param predicate - предикат для подсветки
   */
  transform(value: string, predicate: string): string {
    return this._departmentStoreService.isFilterFormValid()
      ? value
          .toString()
          .replace(
            new RegExp(`(${predicate})`, "gi"),
            `<span class="highlight">` + "$&" + `</span>`,
          )
      : value.toString();
  }
}
