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

  transactions$: Observable<Transaction[]>;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactions$ = this.transactionsService.getTransactions();
    console.log('value', this.transactions$);
  }

}
