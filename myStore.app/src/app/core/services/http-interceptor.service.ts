import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        // get the token
        const token: string = sessionStorage.getItem('currentUser') && 
                JSON.parse(sessionStorage.getItem('currentUser')).token;

        // add it if we have one
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', token) });
        }

        return next.handle(req);
    }
}