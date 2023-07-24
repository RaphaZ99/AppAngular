import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  isInvalidField(controlName: string,formulary: any): boolean {
    const control = formulary.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  getCurrentError(controlName: string, formulary: any) : any{
    
    return formulary.get(controlName)?.errors ? Object.keys(formulary.get(controlName).errors)[0] : null
  } 
}
