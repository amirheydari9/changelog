import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {timeout, catchError, retry} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class HamdamAdminPanelInterceptor implements HttpInterceptor {

    public defaultTimeout = 20000;

    constructor(private router: Router, private oAuthService: OAuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;

        const myRequest: HttpRequest<any> = req.clone({

            headers: req.url !== 'https://accounts.idall.pro/oauth/userinfo' ? req.headers.append('Authorization', this.oAuthService.authorizationHeader()) : null
        });

        return next.handle(myRequest).pipe(
            retry(1),
            timeout(Number(timeoutValue)),
            catchError((error: HttpErrorResponse) => {

                if ((error.status === 401 || error.status === 403)) {

                    this.oAuthService.logOut(true);

                    //TODO خالی کردن مقدار بیهویر یوزر

                    this.router.navigateByUrl('/');

                    return of(null);
                }

                const errorDesc = error.error.error.description;

                return throwError(errorDesc);
            })
        );
    }
}
