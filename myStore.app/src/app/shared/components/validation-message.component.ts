import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
    selector: 'validation-message',
    template: `<span *ngIf="hasError()"><em *ngFor="let error of listOfErrors()" class="validation-message">{{error}}</em></span>`
})
export class ValidationMessageComponent {
    private static readonly errorMessages = {
        'required': (params) => '##FIELD## can\'t be blank',
        'minlength': (params) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
        'maxlength': (params) => '##FIELD## should not be greater then ' + params.requiredLength + ' characters',
        'pattern': (params) => 'Should be a valid',
        'email': (params) => "Should be vaild email",
    };

    @Input() control: AbstractControlDirective | AbstractControl;

    hasError(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
    }

    getError(): string {
        var errors = Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
        return errors[0];
    }

    private getMessage(type: string, params: any, control: any) {
        var fname = this.getControlName(control);
        fname = fname.replace("_", " ").replace(" id", "").toLowerCase();
        fname = fname.replace(/\b\w/g, l => l.toUpperCase())
        var msg = ValidationMessageComponent.errorMessages[type](params);
        return msg.replace("##FIELD##", fname);
    }

    getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
}