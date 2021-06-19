import { createReducer, on } from '@ngrx/store';
import { toggleTrasferConfirmationModal } from './app.actions';
import { Transfer } from '../models/transfer.model';

export interface AppState {
    amountBalance: number;
    openTrasferConfirmationModal: boolean;
    trasferConfirmationModalData: Transfer;
}

export const initialState: AppState = {
    amountBalance: 5824.76,
    openTrasferConfirmationModal: false,
    trasferConfirmationModalData: { amount: 0, toAccount: '' },
};

const _appReducer = createReducer(
  initialState,
  on(toggleTrasferConfirmationModal, (state, props) => ({
    ...state,
    openTrasferConfirmationModal: props.open,
    trasferConfirmationModalData: props.data || { amount: 0, toAccount: '' },
  })),
);

export function appReducer(state, action) {
  return _appReducer(state, action);
}
