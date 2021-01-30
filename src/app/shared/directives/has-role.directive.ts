import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
    @Input() appHasRole: string[];

    isVisible = false;
    userRoles;
    isMatch = false;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.authService.getBehaviourUserInfo().subscribe(
            (userInfo) => {
                if (userInfo) {
                    this.userRoles = userInfo.roles;
                    if (!this.userRoles) {
                        this.viewContainerRef.clear();
                    }
                    this.appHasRole.forEach(role => {
                        if (this.userRoles.includes(role)) {
                            this.isMatch = true;
                            return;
                        }
                    });

                    // if (this.appHasRole.includes(this.userRoles)) {
                    //     if (!this.isVisible) {
                    //         this.isVisible = true;
                    //         this.viewContainerRef.createEmbeddedView(this.templateRef);
                    //     } else {
                    //         this.isVisible = false;
                    //         this.viewContainerRef.clear();
                    //     }
                    // }
                    if (this.isMatch) {
                        if (!this.isVisible) {
                            this.isVisible = true;
                            this.viewContainerRef.createEmbeddedView(this.templateRef);
                        } else {
                            this.isVisible = false;
                            this.viewContainerRef.clear();
                        }
                    }
                }
            }
        )
    }
}
