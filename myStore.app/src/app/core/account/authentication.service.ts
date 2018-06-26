import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BaseRepositoryService, ToasterService } from '../../shared/index';
import { SignInModel, AccessTokenModel, UserType } from '../index';

@Injectable()
export class AuthenticationService extends BaseRepositoryService {
    constructor(private httpClient: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private toaster: ToasterService) {
        super(httpClient, 'admin/account');
    }

    signIn(signIn: SignInModel) {
        this.post<SignInModel, AccessTokenModel>(signIn, 'signin').subscribe(
            (response: AccessTokenModel) => {
                sessionStorage.setItem('currentUser', JSON.stringify(response));

                let returnUrl = this.route.snapshot.queryParams['returnUrl'];
                if (returnUrl)
                    this.router.navigateByUrl(returnUrl);
                else if (response.type == UserType.Admin)
                    this.router.navigate(['/admin/category']);
            },
            exception => {
                this.toaster.error(exception.error.errors)
            }
        );
    }

    signOut(){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/home']);
    }

    signUp(){
        
    }

    isAuthenticated(type: UserType): boolean {
        let currentUser = sessionStorage.getItem('currentUser');
        return !!currentUser &&
            (JSON.parse(currentUser) as AccessTokenModel).type == type;
    }
}