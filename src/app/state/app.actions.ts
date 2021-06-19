import { createAction, props } from '@ngrx/store';

import { Transfer } from '../models/transfer.model'

export const toggleTrasferConfirmationModal = createAction(
    '[App] toggle trasfer confirmation modal',
    props<{ open: boolean; data?: Transfer }>()
);
export const getTransactions = createAction('[App] get transactions');
