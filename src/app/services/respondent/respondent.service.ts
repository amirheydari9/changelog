import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RespondentService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getRespondent = (respondentId: string): Observable<any> => {
        return this.httpClient.get(environment.url + 'api/Panel/v1/Respondent/' + respondentId + '/PersonalityTests')
            .pipe(map((data) => data['data']))
    };

    getRespondentDetail = (respondentId: string, respondentPersonalityTestId: string): Observable<any> => {
          return this.httpClient.get(environment.url + 'api/Panel/v1/Respondent/' + respondentId + '/PersonalityTests/' + respondentPersonalityTestId)
              .pipe(map(data => data['data']));
      }
}
