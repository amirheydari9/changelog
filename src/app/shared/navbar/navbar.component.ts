import {Component, Output, EventEmitter, OnInit, AfterViewInit} from '@angular/core';

import {LayoutService} from '../services/layout.service';
import {ConfigService} from '../services/config.service';
import {PlacementArray} from '@ng-bootstrap/ng-bootstrap/util/positioning';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    currentLang = 'en';
    toggleClass = 'ft-maximize';
    placement: PlacementArray = 'bottom-left';
    public isCollapsed = true;
    @Output()
    toggleHideSidebar = new EventEmitter<Object>();

    public config: any = {};

    constructor(
        private layoutService: LayoutService,
        private configService: ConfigService,
        private oAuthService: OAuthService,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.config = this.configService.templateConf;
    }

    ngAfterViewInit() {
        if (this.config.layout.dir) {
            const dir = this.config.layout.dir;
            if (dir === 'rtl') {
                this.placement = 'bottom-left';
            } else if (dir === 'ltr') {
                this.placement = 'bottom-right';
            }
        }
    }


    ChangeLanguage(language: string) {
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        } else {
            this.toggleClass = 'ft-maximize';
        }
    }

    toggleNotificationSidebar() {
        this.layoutService.emitChange(true);
    }

    toggleSidebar() {
        const appSidebar = document.getElementsByClassName('app-sidebar')[0];
        if (appSidebar.classList.contains('hide-sidebar')) {
            this.toggleHideSidebar.emit(false);
        } else {
            this.toggleHideSidebar.emit(true);
        }
    }

    logout() {

        this.oAuthService.logOut(true);
        this.router.navigateByUrl('/');
        // TODO نال کردن کاربر لاگین شده
    }
}
