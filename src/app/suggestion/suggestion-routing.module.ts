import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleGuardService} from '../services/guard/role-guard.service';
import {ReadyToAssignSuggestionsListComponent} from './ready-to-assign-suggestions-list/ready-to-assign-suggestions-list.component';
import {MySuggestionsListComponent} from './my-suggestions-list/my-suggestions-list.component';
import {SuggestionsListComponent} from './suggestions-list/suggestions-list.component';


const routes: Routes = [
    {
        path: '',
        canActivate: [RoleGuardService],
        children: [
            {
                path: 'suggestions-list',
                component: SuggestionsListComponent,
                data: {roles: ['TebyanAdmin', 'PanelAdmin']},
            },
            {
                path: 'ready-to-assign-suggestions-list',
                component: ReadyToAssignSuggestionsListComponent,
                data: {roles: ['TebyanAdmin', 'PanelAdmin', 'Agent']},
            },
            {
                path: 'my-suggestions-list',
                component: MySuggestionsListComponent,
                data: {roles: ['TebyanAdmin', 'PanelAdmin', 'Agent']},
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SuggestionRoutingModule {
}
