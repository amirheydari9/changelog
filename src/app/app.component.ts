import {Component, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from './sso.config';
import {CommonService} from './services/common/common.service';
import {AuthService} from './services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {isArrayLike} from 'rxjs/internal-compatibility';
import {AgentService} from './services/agent/agent.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(
        private router: Router,
        public oAuthService: OAuthService,
        private commonService: CommonService,
        private authService: AuthService,
        private alertService: ToastrService,
        private agentService: AgentService
    ) {
    }

    ngOnInit() {

        // this.oAuthService.events.subscribe(event => {
        //
        //     if (event['type'] === 'token_received') {
        //
        //     }
        // });

        // if(JSON.parse(window.localStorage.getItem('Htoken'))){
        //     this.router.navigate['login']
        // }


        this.configureSingleSignOn();

        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));

        // if (window.sessionStorage.getItem('PKCE_verifier') && window.sessionStorage.getItem('nonce')) {
        // this.configureSingleSignOn();
        // this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        //     if (this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidIdToken()) {
        //         window.localStorage.setItem('Htoken', JSON.stringify(this.oAuthService.getAccessToken()));
        //     }
        // });
        // } else {
        //     this.router.navigate(['/login'])
        // }
    }

    configureSingleSignOn() {

        this.oAuthService.configure(authCodeFlowConfig);

        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(
            () => {

                if (this.oAuthService.getAccessToken() && this.oAuthService.getIdToken()) {

                    this.authService.getUser().subscribe(
                        (data) => {
                            if (!data.roles) {
                                this.oAuthService.logOut(true);
                                this.alertService.error('نقش کاربر نامعتبر است');
                                // TODO نال کردن کاربر
                            }
                            this.authService.setBehaviourUserInfo(data);
                        }, error => {
                            this.oAuthService.logOut(true);
                            this.alertService.error('خطا در دریافت اطلاعات کاربر');
                            // TODO نال کردن کاربر
                        }
                    );

                    this.commonService.getProvinces().subscribe(
                        (data) => {
                            this.commonService.setBehaviourProvinces(data['data'].items);
                        }
                    );

                    this.commonService.getCities().subscribe(
                        (data) => {
                            this.commonService.setBehaviourCities(data['data'].items);
                        }
                    );

                    this.agentService.getAgentGroups().subscribe(
                        (data) => {
                            this.agentService.setBehaviourAgentGroups(data['data'].items);
                        }
                    );

                    //TODO باید دراینجا رول سرویس رول یوزر رو کارکنی اگه خطا خوردی لاگ اوت و توکن رو پاک کن و برئ به لاگین
                    this.oAuthService.loadUserProfile();
                }
            }
        );
    }

    get token() {

        const clamis = this.oAuthService.getIdentityClaims();

        return clamis ? clamis : null
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
