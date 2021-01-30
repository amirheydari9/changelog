import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
// import {UsersSuggestionComponent} from './users-suggestion/users-suggestion.component';
import {RoleGuardService} from '../services/guard/role-guard.service';


const routes: Routes = [
    {
        path: '',
        canActivate: [RoleGuardService],
        children: [
            {
                path: 'users-list',
                component: UsersListComponent,
                data: {roles: ['TebyanAdmin', 'PanelAdmin']},
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {
}
