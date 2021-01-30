import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private httpClient: HttpClient,
        private oAuthService: OAuthService,
        private router: Router
    ) {
    }

    public getBehaviourUserInfo(): Observable<any> {

        return this.userInfo;
    }

    public setBehaviourUserInfo(userInfo: any): void {
        if (userInfo) {
            const roles = [];
            userInfo.roles.forEach(role => {
                const row = role.name;
                roles.push(row);
            });
            userInfo = {...userInfo, roles};
        }
        this.userInfo.next(userInfo)
    }

    // getUser() {
    //     return of({name: 'ali', roles: ['admin', 'agent']})
    // }

    getUser() {
        return this.httpClient.get(environment.url + 'api/Panel/v1/Accounts').pipe(map(data => data['data']));
    }
}
