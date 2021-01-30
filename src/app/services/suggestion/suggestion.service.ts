import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SuggestionService {

    constructor(
        private http: HttpClient
    ) {
    }

    getSuggestionsList(
        SearchValue?: string, MatePlaceOfResidenceCityIds?: number[], SuggestedPlaceOfResidenceCityIds?: number[], Statuses?: number[], AgentAssignmentStatuses?: number[],
        FromStatusChangedDate?: string, ToStatusChangedDate?: string, page?: number, size?: number) {

        let search = `PageNumber=${page}&PageSize=${size}`;

        if (SearchValue.trim().length > 0) {
            search += `&SearchValue=${SearchValue}`
        }
        if (MatePlaceOfResidenceCityIds && MatePlaceOfResidenceCityIds.length > 0) {
            MatePlaceOfResidenceCityIds.forEach(item => search += `&MatePlaceOfResidenceCityIds=${item}`);
        }
        if (SuggestedPlaceOfResidenceCityIds && SuggestedPlaceOfResidenceCityIds.length > 0) {
            SuggestedPlaceOfResidenceCityIds.forEach(item => search += `&SuggestedPlaceOfResidenceCityIds=${item}`);
        }
        if (Statuses && Statuses.length > 0) {
            Statuses.forEach(item => search += `&Statuses=${item}`);
        }
        if (AgentAssignmentStatuses && AgentAssignmentStatuses.length > 0) {
            AgentAssignmentStatuses.forEach(item => search += `&AgentAssignmentStatuses=${item}`);
        }
        if (FromStatusChangedDate) {
            search += `&FromStatusChangedDate=${FromStatusChangedDate}`
        }
        if (ToStatusChangedDate) {
            search += `&ToStatusChangedDate=${ToStatusChangedDate}`
        }

        return this.http.get(environment.url + 'api/Panel/v1/Suggestions/search?' + search).pipe(map(data => data['data']));
    }

    showSuggestionDetail = (suggestionId: string) => {
        return this.http.get(environment.url + 'api/Panel/v1/Suggestions/' + suggestionId).pipe(map(data => data['data']));
    };

    editSuggestion = (suggestionId: string, agentId: string) => {
        return this.http.put(environment.url + 'api/Panel/v1/Suggestions/' + suggestionId + '/Refer', {agentId})
    };

    readyToAssignSuggestionsList = (
        SearchValue?: string, MatePlaceOfResidenceCityIds?: number[], SuggestedPlaceOfResidenceCityIds?: number[], Statuses?: number[], AssignmentStatuses?: number[],
        page?: number, size?: number) => {

        let search = `PageNumber=${page}&PageSize=${size}`;

        if (SearchValue.trim().length > 0) {
            search += `&SearchValue=${SearchValue}`
        }
        if (MatePlaceOfResidenceCityIds && MatePlaceOfResidenceCityIds.length > 0) {
            MatePlaceOfResidenceCityIds.forEach(item => search += `&MatePlaceOfResidenceCityIds=${item}`);
        }
        if (SuggestedPlaceOfResidenceCityIds && SuggestedPlaceOfResidenceCityIds.length > 0) {
            SuggestedPlaceOfResidenceCityIds.forEach(item => search += `&SuggestedPlaceOfResidenceCityIds=${item}`);
        }
        if (Statuses && Statuses.length > 0) {
            Statuses.forEach(item => search += `&Statuses=${item}`);
        }
        if (AssignmentStatuses && AssignmentStatuses.length > 0) {
            AssignmentStatuses.forEach(item => search += `&AssignmentStatuses=${item}`);
        }

        return this.http.get(environment.url + 'api/Panel/v1/Suggestions/ReadyToAssign?' + search).pipe(map(data => data['data']))
    };

    readyToAssignSuggestionsListDetail = (suggestionId: string) => {
        return this.http.get(environment.url + 'api/Panel/v1/Suggestions/ReadyToAssign/' + suggestionId).pipe(map(data => data['data']));
    };

    readyToAssignToAgent = (suggestionId: string) => {
        return this.http.put(environment.url + 'api/Panel/v1/Suggestions/ReadyToAssign/' + suggestionId + '/Assign', {})
    };

    getMySuggestionsList = (
        SearchValue?: string, MatePlaceOfResidenceCityIds?: number[], SuggestedPlaceOfResidenceCityIds?: number[], Statuses?: number[], AssignmentStatuses?: number[],
        page?: number, size?: number) => {

        let search = `PageNumber=${page}&PageSize=${size}`;

        if (SearchValue.trim().length > 0) {
            search += `&SearchValue=${SearchValue}`
        }
        if (MatePlaceOfResidenceCityIds && MatePlaceOfResidenceCityIds.length > 0) {
            MatePlaceOfResidenceCityIds.forEach(item => search += `&MatePlaceOfResidenceCityIds=${item}`);
        }
        if (SuggestedPlaceOfResidenceCityIds && SuggestedPlaceOfResidenceCityIds.length > 0) {
            SuggestedPlaceOfResidenceCityIds.forEach(item => search += `&SuggestedPlaceOfResidenceCityIds=${item}`);
        }
        if (Statuses && Statuses.length > 0) {
            Statuses.forEach(item => search += `&Statuses=${item}`);
        }
        if (AssignmentStatuses && AssignmentStatuses.length > 0) {
            AssignmentStatuses.forEach(item => search += `&AssignmentStatuses=${item}`);
        }
        return this.http.get(environment.url + 'api/Panel/v1/Suggestions/AssignedToAgent/Search?' + search).pipe(map(data => data['data']));
    };

    unAssignSuggestionFromAgent = (suggestionId: string) => {
        return this.http.put(environment.url + 'api/Panel/v1/Suggestions/AssignedToAgent/' + suggestionId + '/UnAssign', {});
    };

    getMySuggestionDetail = (suggestionId: string) => {
        return this.http.get(environment.url + 'api/Panel/v1/Suggestions/AssignedToAgent/' + suggestionId).pipe(map(data => data['data']));
    };
}


