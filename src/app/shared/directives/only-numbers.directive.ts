import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {


  @HostListener('Keydow',['$event'])
  onKeyDown(event: KeyboardEvent): void{
    const key = event.key;
    if(!/^[0-9]$/.test(key)&& !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)){
      event.preventDefault();
    }
  }

  @HostListener('keyup', ['$event.target'])
  onKeyUp(input: HTMLInputElement): void {
    const value = input.value;
    if (value && !/^[0-9]+$/.test(value)) {
      input.value = ''; // Limpa o campo se não for um número válido
    }
  }

 
     
  constructor() { }

}
