import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private tokenStorage: TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.tokenStorage.getToken()}`
            }
        }); return next.handle(request);
    }
}