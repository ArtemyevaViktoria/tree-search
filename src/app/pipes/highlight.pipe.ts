import { Pipe, PipeTransform } from "@angular/core";
import { IFilterableEmployees } from "src/app/interfaces/filter.interfaces";

@Pipe({
  name: "highlight",
  standalone: true,
  pure: false,
})
export class HighlightPipe implements PipeTransform {
  /** Подсвечивание части строки соответствующей предикату
   * @param value - значение для подсветки
   * @param predicate - предикат для подсветки
   * @param filterService - сервис для фильтрации
   */
  transform(value: string, predicate: string, filterService: IFilterableEmployees): string {
    return filterService.isHighlightPredicateSearchable()
      ? value
          .toString()
          .replace(
            new RegExp(`(${predicate})`, "gi"),
            `<span class="highlight">` + "$&" + `</span>`,
          )
      : value.toString();
  }
}
