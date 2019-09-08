import { ChargeResponse } from '../../src/providers/charge/charge.interface';

type ChargeStatus = 'new' | 'authorised' | 'rejected' | 'cancelled' | 'submitted' | 'executed' | 'failed';

export interface SetChargeState {
    saved?: boolean;
    status: ChargeStatus;
}

export interface SetStatePayload {
    user?: boolean;
    email?: string;
    verified?: boolean;
    token?: boolean;
    templates?: number;
    password?: string;
    charges?: SetChargeState[];
}

export interface SetStateResponse {
    token: string;
    code: string;
    charges: ChargeResponse[];
}
