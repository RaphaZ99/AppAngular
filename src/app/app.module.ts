import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EmployeesService } from 'src/app/services/employees.service';
import { SectorsService } from './services/sectors.service';
import { EmployeeComponent } from './components/employees/employees.component';
import { InputErrorComponent } from './components/input-erros/input-error/input-error.component';
import { AddressComponent } from './components/address/address/address.component';
import { OnlyNumbersDirective } from './shared/directives/only-numbers.directive';
import { LimitLengthDirective } from './shared/directives/limit-length.directive';
import { SectorModalComponent } from './components/sector/sector-modal/sector-modal.component';
import { DateFormatDirective } from './shared/directives/date-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    InputErrorComponent,
    AddressComponent,
    OnlyNumbersDirective,
    LimitLengthDirective,
    SectorModalComponent,
    DateFormatDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpClientModule, EmployeesService, SectorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
