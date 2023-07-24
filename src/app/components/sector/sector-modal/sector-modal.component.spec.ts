import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorModalComponent } from './sector-modal.component';

describe('SectorModalComponent', () => {
  let component: SectorModalComponent;
  let fixture: ComponentFixture<SectorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectorModalComponent]
    });
    fixture = TestBed.createComponent(SectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
