import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {


  transactions$: any[];

  constructor(private transactionsService: TransactionsService) {
   }

  ngOnInit(): void {
    //this.transactions$ = this.transactionsService.getTransactions();
   // sessionStorage.setItem('transactionData', JSON.stringify(this.transactionDetail));
    // this.transactions$ = this.yes().subscribe((snaps) => {
    //   this.chal = snaps;
    // });
    //this.transactions$ = JSON.parse(sessionStorage.getItem('transactionData')).data;
   // this.transactions$ = this.transactionsService.getTransactions();
   if(sessionStorage.getItem('transactionData') === null) {
    this.transactionsService.loadTransactions();
   } else {
    this.transactionList();
   }
  }

  ngAfterViewChecked() {
    this.transactionList();
  }

  transactionList(): void {
    this.transactions$ = JSON.parse(sessionStorage.getItem('transactionData')).data;
  }

  filterTransaction(event) {
    this.transactionList();
    this.transactions$ = this.transactions$.filter(e => {
      return e.merchant.name.toLowerCase() === event.toLowerCase() ||
              e.merchant.name.toLowerCase().indexOf(event.toLowerCase()) >= 0
    });
  }

}
