import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApplicantFamilyRelationshipsService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getAllFamilyRelationships = (applicantId: string) => {
        return this.httpClient.get(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantFamilyRelationships')
            .pipe(map(data => data['data']))
    };

    getFamilyRelationships = (applicantId: string, ApplicantFamilyRelationshipsId: string) => {
        return this.httpClient.get(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantFamilyRelationships/' + ApplicantFamilyRelationshipsId)
            .pipe(map(data => data['data']))
    };

    createFamilyRelationships = (applicantId: string, relationship) => {
        return this.httpClient.post(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantFamilyRelationships', relationship)
    };

    updateFamilyRelationships = (applicantId: string, relationshipId: string, relation) => {
        return this.httpClient.put(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantFamilyRelationships/' + relationshipId, relation)
    };

    deleteFamilyRelationships = (applicantId: string, relationshipId: string) => {
        return this.httpClient.delete(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantFamilyRelationships/' + relationshipId, {})
    };
}
