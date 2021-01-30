import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

// COMPONENTS
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NotificationSidebarComponent} from './notification-sidebar/notification-sidebar.component';

// DIRECTIVES
import {ToggleFullscreenDirective} from './directives/toggle-fullscreen.directive';
import {SidebarDirective} from './directives/sidebar.directive';
import {SidebarLinkDirective} from './directives/sidebarlink.directive';
import {SidebarListDirective} from './directives/sidebarlist.directive';
import {SidebarAnchorToggleDirective} from './directives/sidebaranchortoggle.directive';
import {SidebarToggleDirective} from './directives/sidebartoggle.directive';
import {SearchPipe} from './pipes/search.pipe';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomPaginator} from './custom-paginator/CustomPaginatorConfiguration';
import {StylePaginatorDirective} from './directives/style-paginator.directive';
import {GenderPipe} from './pipes/gender.pipe';
import {ReligionPipe} from './pipes/religion.pipe';
import {MateStatePipe} from './pipes/mate-state.pipe';
import {SuggestionStatePipe} from './pipes/suggestion-state.pipe';
import {SelectCheckAllComponent} from './component/select-check-all/select-check-all.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {MartialStatusPipe} from './pipes/martial-status.pipe';
import {HasRoleDirective} from './directives/has-role.directive';
import {RespondentSvgComponent} from './component/respondent-svg/respondent-svg.component';
import { EpqTitlePipe } from './pipes/epq-title.pipe';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        NgbModule,
        StylePaginatorDirective,
        MateStatePipe,
        GenderPipe,
        ReligionPipe,
        SuggestionStatePipe,
        SelectCheckAllComponent,
        MartialStatusPipe,
        RespondentSvgComponent,
        EpqTitlePipe,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        PerfectScrollbarModule,
        CustomMaterialModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        SearchPipe,
        StylePaginatorDirective,
        GenderPipe,
        ReligionPipe,
        MateStatePipe,
        SuggestionStatePipe,
        SelectCheckAllComponent,
        MartialStatusPipe,
        HasRoleDirective,
        RespondentSvgComponent,
        EpqTitlePipe
    ],
    providers: [
        {provide: MatPaginatorIntl, useValue: CustomPaginator()}
    ]
})
export class SharedModule {
}

