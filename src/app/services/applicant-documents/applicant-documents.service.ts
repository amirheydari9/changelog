import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApplicantDocumentsService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getAllDocuments = (applicantId: string) => {
        return this.httpClient.get(environment.url + 'api/Panel/v1/Applicants/' + applicantId).pipe(map(data => data['data']));
    };

    createDocument = (applicantId: string, document) => {
        return this.httpClient.post(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantDocuments', document)
    };

    deleteDocument = (applicantId: string, documentId: string) => {
        return this.httpClient.delete(environment.url + 'api/Panel/v1/Applicants/' + applicantId + '/ApplicantDocuments/' + documentId, {})
    }
}
