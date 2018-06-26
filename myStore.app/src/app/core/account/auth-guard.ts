import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, UserType } from '../index';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let type: UserType = UserType.Customers;
        if (state.url.indexOf('admin') > -1)
            type = UserType.Admin;
        let isAuthenticated = this.authService.isAuthenticated(type);
        if (!isAuthenticated) {
            this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
            return isAuthenticated;
        }
        else
            return isAuthenticated;
    }
}