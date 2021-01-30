import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AgentsListComponent} from './agents-list/agents-list.component';
import {RoleGuardService} from '../services/guard/role-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [RoleGuardService],
        children: [
            {
                path: 'agents-list',
                component: AgentsListComponent,
                data: {roles: ['TebyanAdmin', 'PanelAdmin']},
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AgentRoutingModule {
}
