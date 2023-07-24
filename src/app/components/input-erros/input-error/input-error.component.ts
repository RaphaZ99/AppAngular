import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent {
@Input() isInvalidInput!: boolean;
@Input() errorMessages: {[key: string]: string} = {}
@Input() currentError!: string;
 

getErrorMessage(): string{
  //console.log(this.errorMessages);
   
    if (this.isInvalidInput && this.currentError) {
      return this.errorMessages[this.currentError] || 'Invalid Field!';
     
  }
  return '';
} 
}
