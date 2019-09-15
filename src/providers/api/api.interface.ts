import { HttpErrorResponse } from '@angular/common/http';

export interface CustomErrorResponse extends HttpErrorResponse {
    readonly error: {
        header: string;
        message: string;
    };
}
