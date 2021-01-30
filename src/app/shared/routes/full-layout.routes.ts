import {Routes} from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [

    {path: 'user', loadChildren: './user/user.module#UserModule'},
    {path: 'agent', loadChildren: './agent/agent.module#AgentModule'},
    {path: 'suggestion', loadChildren: './suggestion/suggestion.module#SuggestionModule'},
];
