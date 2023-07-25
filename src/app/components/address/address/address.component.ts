import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  formulary: any;

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulary = this.formbuilder.group({
      street: [null],
      zipCode: [null],
      number: [null],
      city: [null],
      region: [null],
      complement: [null],
    });
  }
}
