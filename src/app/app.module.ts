import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterComponent } from './components/filter/filter.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { reducers, metaReducers } from './reducers';
import { appReducer } from './state/app.reducer';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransferConfirmationModalComponent } from './components/transfer-confirmation-modal/transfer-confirmation-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TransactionItemComponent,
    SubmitButtonComponent,
    LogoComponent,
    FooterComponent,
    FilterComponent,
    TransferFormComponent,
    TransactionsListComponent,
    TransferConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreModule.forRoot({
      app: appReducer,
    }),
    NgbModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
