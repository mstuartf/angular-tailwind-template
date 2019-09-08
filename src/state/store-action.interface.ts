import { Action } from '@ngrx/store';

export interface StoreAction extends Action {
    type: string;
    payload?: any;
}
