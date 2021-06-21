import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../state/app.reducer';
import { toggleTrasferConfirmationModal } from '../../state/app.actions';
import { Transfer } from '../../models/transfer.model';


@Component({
  selector: 'app-transfer-confirmation-modal',
  templateUrl: './transfer-confirmation-modal.component.html',
  styleUrls: ['./transfer-confirmation-modal.component.scss']
})
export class TransferConfirmationModalComponent implements OnInit {

  data: Transfer;
  @ViewChild('content') content: Component;
  @Output() transferList = new EventEmitter();
  @Output() transferBox = new EventEmitter();

  constructor(private modalService: NgbModal, private store: Store<{app: AppState}>) {
    this.store.select(({app}) => app.openTrasferConfirmationModal).subscribe(open => {
      if (open) {
        this.open();
      }
    });
    this.store.select(({app}) => app.trasferConfirmationModalData).subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit(): void {
  }

  open = () => {
    this.modalService.open(this.content).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      this.store.dispatch(toggleTrasferConfirmationModal({ open: false }));
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.store.dispatch(toggleTrasferConfirmationModal({ open: false }));
    });
  }

  transfer() {
    let transactionData = JSON.parse(sessionStorage.getItem('transactionData'));
    transactionData.data.unshift(JSON.parse(sessionStorage.getItem('newTransaction')));
    sessionStorage.setItem('transactionData', JSON.stringify(transactionData));
    this.transferList.emit(null);
    this.transferBox.emit(null);
  }
}
