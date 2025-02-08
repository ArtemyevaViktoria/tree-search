import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toInitial",
  standalone: true,
})
export class ToInitialPipe implements PipeTransform {
  /**
   * Преобразует строку в инициал (первый символ в верхнем регистре + точка).
   * @param value - Входная строка для преобразования.
   * @returns Инициал (первый символ + ".") или пустая строка, если входное значение пустое.
   */
  transform(value: string): string {
    if (!value) {
      return "";
    }
    return value.charAt(0).toUpperCase() + ".";
  }
}
