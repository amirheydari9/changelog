import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UsersListService {

    // pageDetail = new Subject();

    religion: Subject<number> = new Subject<number>();
    jobStatus: Subject<number> = new Subject<number>();
    conscriptionStatus: Subject<number> = new Subject<number>();

    constructor(private http: HttpClient) {
    }

    getUsersList = (SearchValue?: string, Genders?: number[], CityIds?: number[], MaritalStatuses?: number[], States?: number[], FromDate?: string, ToDate?: string, page?: number, size?: number) => {

        let search = `PageNumber=${page}&PageSize=${size}`;

        if (SearchValue.trim().length > 0) {
            search += `&SearchValue=${SearchValue}`
        }
        if (Genders && Genders.length > 0) {
            Genders.forEach(item => search += `&Genders=${item}`);
        }
        if (CityIds && CityIds.length > 0) {
            CityIds.forEach(item => search += `&CityIds=${item}`);
        }
        if (MaritalStatuses && MaritalStatuses.length > 0) {
            MaritalStatuses.forEach(item => search += `&MaritalStatuses=${item}`);
        }
        if (States && States.length > 0) {
            States.forEach(item => search += `&States=${item}`);
        }
        if (FromDate) {
            search += `&FromDate=${FromDate}`
        }
        if (ToDate) {
            search += `&ToDate=${ToDate}`
        }

        return this.http.get(environment.url + 'api/Panel/v1/Applicants/search?' + search).pipe(map(data => data['data']));
    };

    getUserInfoDetails = (id: string) => {

        return this.http.get(environment.url + 'api/Panel/v1/Applicants/' + id).pipe(map(data => data['data']));
    };

    verifyUser = (id: string) => {

        return this.http.put(environment.url + 'api/Panel/v1/Applicants/' + id + '/Verify', {});
    };

    editUser = (id: string, user: any) => {

        return this.http.put(environment.url + 'api/Panel/v1/Applicants/' + id, user);
    };
}
