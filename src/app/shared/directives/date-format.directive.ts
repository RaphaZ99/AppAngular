import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDateFormat]',
})
export class DateFormatDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement): void {
    const value = input.value;
    if (value) {
      // Converte a data de dd/mm/yyyy para yyyy-mm-dd
      const [day, month, year] = value.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      // Atualiza o valor do FormControl com a data formatada
      this.ngControl.control?.setValue(formattedDate);
    }
  }
}
