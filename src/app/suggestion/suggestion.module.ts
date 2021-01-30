import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuggestionRoutingModule} from './suggestion-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomMaterialModule} from '../custom-material/custom-material.module';
import {SharedModule} from '../shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MySuggestionsListComponent} from './my-suggestions-list/my-suggestions-list.component';
import {ReadyToAssignSuggestionsListComponent} from './ready-to-assign-suggestions-list/ready-to-assign-suggestions-list.component';
import {SuggestionsListComponent} from './suggestions-list/suggestions-list.component';
import {SuggestionDetailsComponent} from './suggestions-list/suggestion-details/suggestion-details.component';
import {SuggestionAccountInfoComponent} from './suggestions-list/suggestion-details/suggestion-account-info/suggestion-account-info.component';
import {SuggestionCallInfoComponent} from './suggestions-list/suggestion-details/suggestion-call-info/suggestion-call-info.component';
import {SuggesstionCompleteInfoComponent} from './suggestions-list/suggestion-details/suggesstion-complete-info/suggesstion-complete-info.component';
import {SuggesstionEconomicStatusInfoComponent} from './suggestions-list/suggestion-details/suggesstion-economic-status-info/suggesstion-economic-status-info.component';
import {SuggesstionEducationInfoComponent} from './suggestions-list/suggestion-details/suggesstion-education-info/suggesstion-education-info.component';
import {SuggesstionExtraInfoComponent} from './suggestions-list/suggestion-details/suggesstion-extra-info/suggesstion-extra-info.component';
import {SuggesstionFamilyInfoComponent} from './suggestions-list/suggestion-details/suggesstion-family-info/suggesstion-family-info.component';
import {SuggesstionJobInfoComponent} from './suggestions-list/suggestion-details/suggesstion-job-info/suggesstion-job-info.component';
import {SuggesstionLikesComponent} from './suggestions-list/suggestion-details/suggesstion-likes/suggesstion-likes.component';
import {SuggesstionPersonalInfoComponent} from './suggestions-list/suggestion-details/suggesstion-personal-info/suggesstion-personal-info.component';
import {SuggestionHeaderComponent} from './suggestions-list/suggestion-details/suggestion-header/suggestion-header.component';
import {SuggestionComboAgentComponent} from './suggestions-list/suggestion-combo-agent/suggestion-combo-agent.component';
import { SuggestionRespondentInfoComponent } from './suggestions-list/suggestion-details/suggestion-respondent-info/suggestion-respondent-info.component';

@NgModule({
    declarations: [
        MySuggestionsListComponent,
        ReadyToAssignSuggestionsListComponent,
        SuggestionsListComponent,
        SuggestionDetailsComponent,
        SuggestionAccountInfoComponent,
        SuggestionCallInfoComponent,
        SuggesstionCompleteInfoComponent,
        SuggesstionEconomicStatusInfoComponent,
        SuggesstionEducationInfoComponent,
        SuggesstionExtraInfoComponent,
        SuggesstionFamilyInfoComponent,
        SuggesstionJobInfoComponent,
        SuggesstionLikesComponent,
        SuggesstionPersonalInfoComponent,
        SuggestionHeaderComponent,
        SuggestionComboAgentComponent,
        SuggestionRespondentInfoComponent,
    ],
    imports: [
        CommonModule,
        SuggestionRoutingModule,
        FormsModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        SharedModule,
        MatDatepickerModule,
    ],
    entryComponents: [SuggestionDetailsComponent , SuggestionComboAgentComponent]
})

export class SuggestionModule {
}
