import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { toggleTrasferConfirmationModal } from '../../state/app.actions';
import { AppState } from '../../state/app.reducer';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {

  amountBalance$: Observable<number>;
  amountBalance: number;
  form: FormGroup;
  submitted: Boolean = false;
  toAccountName;
  amountValue;

  constructor(private fb: FormBuilder, private store: Store<{app: AppState}>) {
    this.amountBalance$ = store.select(({app}) => app.amountBalance);
    this.amountBalance$.subscribe(amount => {
      this.amountBalance = amount;
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      toAccount: new FormControl(null, { validators: Validators.required, updateOn: 'submit' }),
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.min(0), this.createAmountBalanceValidator()],
        updateOn: 'submit'
      }),
    });
  }

  get toAccount(): AbstractControl {
    return this.form.controls.toAccount;
  }

  get amount(): AbstractControl {
    return this.form.controls.amount;
  }

  createAmountBalanceValidator = (): ValidatorFn => {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        return (this.amountBalance - value) < -500 ? {balanceTooSmall:true}: null;
    }
  }

  handleSubmit = (event) => {
    this.submitted = true;
    const d = new Date();
    let newTransaction = {
      categoryCode: "#12a580",
      dates: {
        valueDate: d.getTime()
      },
      transaction: {
        amountCurrency: {
          amount: this.amountValue,
          currencyCode: "EUR"
        },
        type: "Online Transfer",
        creditDebitIndicator: "DBIT"
      },
      merchant: {
        name: this.toAccountName,
        accountNumber: "SI64397745065188826"
      }
    };
    sessionStorage.setItem('newTransaction', JSON.stringify(newTransaction));
    this.store.dispatch(toggleTrasferConfirmationModal({ open: true, data: this.form.value }))
  }

  resetTransfer() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null)
    });
  }

}
