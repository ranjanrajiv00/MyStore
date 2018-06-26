import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../core/index';

@Injectable()
export class BaseRepositoryService {
    private apiUrl: string = Constants.API_URL;

    constructor(private http: HttpClient, private baseUrl: string) {

    }

    get<T>(url?: string): Observable<T> {
        return this.http.get<T>(this.requestUrl(url));
    }

    post<T, V>(body?: T, url?: string): Observable<V> {
        return this.http.post<V>(this.requestUrl(url), body);
    }

    put<T, V>(body?: T, url?: string): Observable<V> {
        return this.http.put<V>(this.requestUrl(url), body);
    }

    patch<T, V>(body?: T, url?: string): Observable<V> {
        return this.http.patch<V>(this.requestUrl(url), body);
    }

    delete<T>(url?: string): Observable<T> {
        return this.http.delete<T>(this.requestUrl(url));
    }

    private requestUrl(url: string): string {
        return `${this.apiUrl}/${this.baseUrl}${url ? `/${url}` : ``}`;
    }
}