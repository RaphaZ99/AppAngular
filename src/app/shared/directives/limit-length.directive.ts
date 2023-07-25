import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLimitLength]',
})
export class LimitLengthDirective {
  @Input() maxLength!: number;

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    if (inputElement.value.length > this.maxLength) {
      inputElement.value = inputElement.value.slice(0, this.maxLength);
    }
  }

  constructor(private el: ElementRef) {}
}
