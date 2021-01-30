import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AgentRoutingModule} from './agent-routing.module';
import {AgentsListComponent} from './agents-list/agents-list.component';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AgentDetailComponent} from './agents-list/agent-detail/agent-detail.component';
import {AgentInfoComponent} from './agents-list/agent-detail/agent-info/agent-info.component';
import {UploadDocumentsComponent} from './agents-list/agent-detail/upload-documents/upload-documents.component';
import {UploadAgentPictureComponent} from './agents-list/agent-detail/upload-agent-picture/upload-agent-picture.component';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
    declarations: [
        AgentsListComponent,
        AgentDetailComponent,
        AgentInfoComponent,
        UploadDocumentsComponent,
        UploadAgentPictureComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AgentRoutingModule,
        CustomMaterialModule,
        MatDatepickerModule,
        NgxMaskModule,
    ],
    entryComponents: [AgentDetailComponent]
})
export class AgentModule {
}
