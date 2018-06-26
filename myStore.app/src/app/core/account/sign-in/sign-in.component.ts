import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService, SignInModel } from '../../index';
import { HelperService } from '../../../shared/index';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    signIn: SignInModel;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private helperService: HelperService) {

    }

    ngOnInit(): void {
        this.signInForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSignIn() {
        if (this.signInForm.valid) {
            this.authService.signIn(this.signInForm.value);
        }
        else {
            this.helperService.validateFields(this.signInForm);
        }
    }
}