import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Injectable()
export class HelperService {
    constructor() { }

    validateFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateFields(control);
            }
        });
    }
}