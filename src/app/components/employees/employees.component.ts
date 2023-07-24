import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { AddressComponent } from '../address/address/address.component';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { Sector } from 'src/app/interfaces/sector';
import { SectorsService } from 'src/app/services/sectors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectorModalComponent } from '../sector/sector-modal/sector-modal.component';

@Component({
  selector: 'app-persons',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm: any;
  titleFormulary!: string;
  sectors!: Sector[];
  selectedSector: any;

  @ViewChild(AddressComponent) addressComponent!: AddressComponent;

  constructor(
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private sectorService: SectorsService,
    private modalService: NgbModal
  ) {
    this.sectorService.GetAll().subscribe((data: any[]) => {
      this.sectors = data;
    });

    console.log(this.sectors);
  }

  ngOnInit(): void {
    //FormControll -> inputs
    //FormGroup -> agrupa
    this.titleFormulary = 'New Employee';
    this.employeeForm = this.formBuilder.group({
      name: [null, Validators.required],
      cpf: [
        null,
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(11),
        ],
      ],
      socialName: [null],
      birthday: [null],
      rg: [
        null,
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(7),
        ],
      ],
      phoneNumber: [null],
      mobileNumber: [null, [Validators.required]],
      jobName: [null],
      salary: [null],
      contractStartDate: [null],
      contractEndDate: [null],
      sector: [null],
    });
  }

  openModal() {
    const modalRef = this.modalService.open(SectorModalComponent, {
      backdrop: false,
    });
    modalRef.result
      .then((result) => {
        console.log(result);
        if (result != undefined) {
          let objectPush = {
            name: result.name,
            id: 0,
          };
          this.sectors.push(objectPush);
          alert('Registration done successfully.');
          modalRef.close();
        } else if (result != undefined && result.status != 200) {
          alert(result.error);
        } else {
          modalRef.close();
        }
      })
      .catch((error) => {
        alert('Unable to register.');
        modalRef.close();
      });
  }

  onSectorSelection(sector: any): void {
    this.selectedSector = sector;
  }

  isInvalidField(controlName: string): boolean {
    return this.formValidationService.isInvalidField(
      controlName,
      this.employeeForm
    );
  }

  getCurrentError(controlName: string): any {
    return this.formValidationService.getCurrentError(
      controlName,
      this.employeeForm
    );
  }

  saveForm(): void {
    const addressForm = this.addressComponent.formulary;

    if (this.employeeForm.valid) {
      const employee: Employee = {
        contractEndDate: this.employeeForm.value.contractEndDate,
        contractStartDate: this.employeeForm.value.contractStartDate,
        salary: this.employeeForm.value.salary,
        person: {
          name: this.employeeForm.value.name,
          cpf: this.employeeForm.value.cpf.toString(),
          socialName: this.employeeForm.value.birthday,
          rg: this.employeeForm.value.rg.toString(),
          phoneNumber:
            this.employeeForm.value.phoneNumber == null
              ? null
              : this.employeeForm.value.phoneNumber.toString(),
          mobileNumber: this.employeeForm.value.mobileNumber.toString(),
          birthday: this.employeeForm.value.birthday,
          address: {
            city: addressForm.value.city,
            complement: addressForm.value.complement,
            number:
              addressForm.value.number == null
                ? null
                : addressForm.value.number.toString(),
            region: addressForm.value.region,
            street: addressForm.value.street,
            zipcode:
              addressForm.value.zipCode == null
                ? null
                : addressForm.value.zipCode.toString(),
          },
        },
        job: {
          name: this.employeeForm.value.jobName,
          sector: {
            name: this.employeeForm.value.sector.name,
            id: 0,
          },
        },
      };

      console.log(employee);

      this.employeesService.PostPerson(employee).subscribe({
        next: (data) => console.log(data),
        error: (data) => alert(data.error),
        complete: () => console.log('complete'),
      });
    } else {
      alert('There are fields that need to be filled in.');
    }
  }
}
