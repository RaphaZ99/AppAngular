import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SectorsService } from 'src/app/services/sectors.service';

@Component({
  selector: 'app-sector-modal',
  templateUrl: './sector-modal.component.html',
  styleUrls: ['./sector-modal.component.css'],
})
export class SectorModalComponent implements OnInit {
  sectorForm: any;

  constructor(
    public activeModal: NgbActiveModal,
    private sectorService: SectorsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sectorForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  save(): void {
    if (this.sectorForm.valid) {
      let sectorPost = {
        name: this.sectorForm.value.name,
        id: 0,
      };
      this.sectorService.save(sectorPost).subscribe({
        next: (data) => this.activeModal.close(data),
        error: (error) => {
          alert(error.error.errorMessage);
          this.activeModal.dismiss();
        },
      });
    }
  }
}
