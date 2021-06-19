import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferConfirmationModalComponent } from './transfer-confirmation-modal.component';

describe('TransferConfirmationModalComponent', () => {
  let component: TransferConfirmationModalComponent;
  let fixture: ComponentFixture<TransferConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
