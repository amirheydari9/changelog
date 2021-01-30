import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private oAuthService: OAuthService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const roles: any[] = route.data.roles;

        let isMatch = false;

        if (roles) {

            this.authService.getBehaviourUserInfo().subscribe(
                (userInfo) => {
                    if (userInfo && userInfo.roles && userInfo.roles.length > 0) {
                        roles.forEach(role => {
                            if (userInfo.roles.includes(role)) {
                                isMatch = true;
                                return;
                            }
                        });
                        if (isMatch) {
                            return true;
                        } else {
                            this.authService.setBehaviourUserInfo(null);
                            this.oAuthService.logOut(true);
                            this.router.navigateByUrl('/');
                            return false;
                        }
                    } else {
                        this.oAuthService.logOut(true);
                        this.router.navigateByUrl('/');
                        return false;
                    }
                }
            )
        }
        return true;
    }
}
