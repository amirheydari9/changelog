import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NgxMaskModule} from 'ngx-mask';

import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {ContentLayoutComponent} from './layouts/content/content-layout.component';
import {FullLayoutComponent} from './layouts/full/full-layout.component';

import {AuthService} from './shared/auth/auth.service';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {UserComponent} from './user/user.component';
import {NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, POSITION, SPINNER} from 'ngx-ui-loader';
import {HamdamAdminPanelInterceptor} from './services/interceptor/hamdam-admin-panel-interceptor';
import { AgentComponent } from './agent/agent.component';
import { SuggestionComponent } from './suggestion/suggestion.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {

    // "text":'چند لحظه صبر کنید',
    'blur': 15,
    'overlayColor': 'rgba(40,40,40,0.92)',

    'bgsColor': 'blue',
    'pbColor': 'blue',
    'bgsPosition': POSITION.bottomCenter,
    'bgsSize': 70,
    'pbThickness': 3,

    'fgsPosition': POSITION.bottomRight,
    'fgsSize': 70,
    'fgsColor': 'blue',
    'bgsType': SPINNER.doubleBounce,
    'fgsType': SPINNER.doubleBounce,
    'masterLoaderId': 'loader-01'
};

@NgModule({
    declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, UserComponent, AgentComponent, SuggestionComponent],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        NgbModule.forRoot(),
        PerfectScrollbarModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule,
        NgxUiLoaderHttpModule.forRoot({showForeground: true}),
        OAuthModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
            progressBar: true,
            progressAnimation: 'decreasing',
        }),
        NgxMaskModule.forRoot(),
    ],
    providers: [
        AuthService,
        AuthGuard,
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: HTTP_INTERCEPTORS, useClass: HamdamAdminPanelInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

