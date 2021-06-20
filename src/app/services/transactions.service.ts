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
  private httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*',  })
  };


  getTransactions() : Observable<Transaction[]> {
    return this.http.get<{data: Transaction[]}>(this.transactionsUrl, this.httpOptions)
      .pipe(
        map(data => data.data),
        catchError(() => of(mockData.data))
      );
  }

  // getTransactions() {
  //   var data =  this.http.get(this.transactionsUrl);
  //   console.log('yes',data);
  //   return data;
  // }
}
