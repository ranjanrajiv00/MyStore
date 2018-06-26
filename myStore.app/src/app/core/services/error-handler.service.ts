import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    constructor() { }

    handleError(error: any): void {
        // log error at server
    }
}