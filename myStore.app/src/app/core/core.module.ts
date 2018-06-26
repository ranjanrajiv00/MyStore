import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/index';
import {
    MenuItemsComponent,
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    SignInComponent,
    HttpInterceptorService,
    ErrorHandlerService,
    AuthenticationService,
    AuthGuard    
} from './index';

@NgModule({
    imports: [
        SharedModule,
        HttpClientModule        
    ],
    declarations: [
        MenuItemsComponent,
        FooterComponent,
        NavbarComponent,
        LayoutComponent,
        SignInComponent
    ],
    exports: [
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
        {
            provide: ErrorHandler,
            useClass: ErrorHandlerService
        }
    ]
})
export class CoreModule { }