import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css'],
})
export class InputErrorComponent implements OnInit {
  @Input() controlName!: string; //recebe o nome do campo
  @Input() errorMessages: { [key: string]: string } = {}; //recebe lista de errors key: nome error / mensagem error
  @Input() formGroup!: FormGroup; // recebe o formulário

  ngOnInit() {}

  getErrorMessage(): string {
    const control = this.formGroup.get(this.controlName);

    if ((control?.invalid && control?.touched) || control?.invalid) {
      const errors = control?.errors;
      if (errors) {
        const errorKeys = Object.keys(errors);
        const firstErrorKey = errorKeys[0];
        return this.errorMessages[firstErrorKey] || 'Invalid Field!';
      }
    }
    return '';
  }
}
