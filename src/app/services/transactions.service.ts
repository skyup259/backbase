import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Transaction } from '../models/transaction.model';
import { mockData } from './mock-data';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private http: HttpClient) { }

 // private transactionsUrl = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
  private transactionsUrl = 'assets/data.json';
  transData: any;
  private httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*',  })
  };


  // getTransactions() : Observable<Transaction[]> {
  //   return this.http.get<{data: Transaction[]}>(this.transactionsUrl, this.httpOptions)
  //     .pipe(
  //       map(data => data.data),
  //       catchError(() => of(mockData.data))
  //     );
  // }

  loadTransactions(): void {
    this.http.get("assets/data.json").subscribe(data =>{
      this.transData = data;
      sessionStorage.setItem('transactionData', JSON.stringify(this.transData));
      this.sortTransaction();
    });
  }

  sortTransaction(): void {
    let tData = JSON.parse(sessionStorage.getItem('transactionData')).data;
    tData =  tData.sort((a, b) => (a.dates.valueDate > b.dates.valueDate ? -1 : 1));
    let pData = JSON.parse(sessionStorage.getItem('transactionData'));
    pData.data = tData;
    sessionStorage.setItem('transactionData', JSON.stringify(pData));
  }
}
