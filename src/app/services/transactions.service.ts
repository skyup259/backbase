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

  private transactionsUrl = 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
  private httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*',  })
  };

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<Transaction[]> {
    return this.http.get<{data: Transaction[]}>(this.transactionsUrl, this.httpOptions)
      .pipe(
        map(data => data.data),
        catchError(() => of(mockData.data))
      );
  }
}
