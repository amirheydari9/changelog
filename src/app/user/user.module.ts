import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from './users-list/users-list.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {UserDetailsComponent} from './users-list/user-details/user-details.component';
import {AccountInfoComponent} from './users-list/user-details/account-info/account-info.component';
import {CallInfoComponent} from './users-list/user-details/call-info/call-info.component';
import {JobInfoComponent} from './users-list/user-details/job-info/job-info.component';
import {EconomicStatusInfoComponent} from './users-list/user-details/economic-status-info/economic-status-info.component';
import {FamilyInfoComponent} from './users-list/user-details/family-info/family-info.component';
import {PersonalInfoComponent} from './users-list/user-details/personal-info/personal-info.component';
import {LikesComponent} from './users-list/user-details/likes/likes.component';
import {ExtraInfoComponent} from './users-list/user-details/extra-info/extra-info.component';
import {UploadFileComponent} from './users-list/user-details/upload-file/upload-file.component';
import {SharedModule} from '../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {EducationInfoComponent} from './users-list/user-details/education-info/education-info.component';
import {CompleteInfoComponent} from './users-list/user-details/complete-info/complete-info.component';
import {RespondentInfoComponent} from './users-list/user-details/respondent-info/respondent-info.component';
import {NgxMaskModule} from 'ngx-mask';
import {RespondentInterpretComponent} from './users-list/user-details/respondent-info/respondent-interpret/respondent-interpret.component';

@NgModule({
    declarations: [
        UsersListComponent,
        UserDetailsComponent,
        AccountInfoComponent,
        CallInfoComponent,
        JobInfoComponent,
        EconomicStatusInfoComponent,
        FamilyInfoComponent,
        PersonalInfoComponent,
        LikesComponent,
        ExtraInfoComponent,
        UploadFileComponent,
        EducationInfoComponent,
        CompleteInfoComponent,
        RespondentInfoComponent,
        RespondentInterpretComponent,
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        SharedModule,
        MatDatepickerModule,
        NgxMaskModule,
    ],
    entryComponents: [UserDetailsComponent, RespondentInterpretComponent]
})
export class UserModule {
}
