import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { AddressComponent } from '../address/address/address.component';
import { SectorsService } from 'src/app/services/sectors.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectorModalComponent } from '../sector/sector-modal/sector-modal.component';
import { Sector } from 'src/app/interfaces/sector';
import { isDateValid } from 'src/app/utils/date-util';

@Component({
  selector: 'app-persons',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  titleFormulary!: string;
  sectors!: Sector[];
  selectedSector: any;

  @ViewChild(AddressComponent) addressComponent!: AddressComponent;

  constructor(
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private sectorService: SectorsService,
    private modalService: NgbModal
  ) {
    this.sectorService.getAll().subscribe((response) => {
      if (response.success) {
        this.sectors = response.dataList;
      } else {
        alert(`Unable to load sectors : ${response.errorMessage}`);
      }
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
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(11),
        ],
      ],
      socialName: [''],
      birthday: [''],
      rg: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]+'),
          Validators.minLength(7),
        ],
      ],
      phoneNumber: [''],
      mobileNumber: ['', [Validators.required]],
      jobName: [''],
      salary: [''],
      contractStartDate: ['', [Validators.required, this.customDateValidator]],
      contractEndDate: [''],
      sector: [''],
    });
  }

  openModal() {
    const modalRef = this.modalService.open(SectorModalComponent, {
      backdrop: false,
    });
    modalRef.result.then((result) => {
      if (result && result.success) {
        let objectPush = {
          name: result.data.name,
          id: result.data.id,
        };
        this.sectors.push(objectPush);
        alert('Registration done successfully.');
      }
    });
  }

  onSectorSelection(sector: any): void {
    this.selectedSector = sector;
  }

  customDateValidator(control: FormControl): { [key: string]: any } | null {
    return isDateValid(control.value) ? null : { invalidDate: true };
  }

  saveForm(): void {
    const addressForm = this.addressComponent.formulary;
    debugger;
    if (this.employeeForm.valid) {
      const employee: Employee = {
        contractEndDate: isDateValid(this.employeeForm.value.contractEndDate)
          ? new Date(this.employeeForm.value.contractEndDate)
          : undefined,
        contractStartDate: new Date(this.employeeForm.value.contractStartDate),
        salary: this.employeeForm.value.salary,
        person: {
          name: this.employeeForm.value.name,
          cpf: this.employeeForm.value.cpf.toString(),
          socialName: this.employeeForm.value.socialName,
          rg: this.employeeForm.value.rg.toString(),
          phoneNumber:
            this.employeeForm.value.phoneNumber == null
              ? null
              : this.employeeForm.value.phoneNumber.toString(),
          mobileNumber: this.employeeForm.value.mobileNumber.toString(),
          birthday: isDateValid(this.employeeForm.value.birthday)
            ? new Date(this.employeeForm.value.birthday)
            : undefined,
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
          sectorId: this.employeeForm.value.sector.id,
        },
      };

      console.log(employee);

      this.employeesService.save(employee).subscribe({
        next: () => {
          alert('Employee Registered.');
          this.employeeForm.reset();
          this.addressComponent.formulary.reset();
        },
        error: (data) => alert(data.error.errorMessage),
        complete: () => console.log('complete'),
      });
    } else {
      alert('There are fields that need to be filled in.');
    }
  }
}
