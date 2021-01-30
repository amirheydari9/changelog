import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICity} from '../../DTO/common/ICity';
import {IProvince} from '../../DTO/common/IProvince';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private provinces: BehaviorSubject<IProvince[]> = new BehaviorSubject<IProvince[]>(null);

    private cities: BehaviorSubject<ICity[]> = new BehaviorSubject<ICity[]>(null);

    public getBehaviourProvinces(): Observable<ICity[]> {

        return this.provinces;
    }

    public setBehaviourProvinces(provinces: IProvince[]) {

        this.provinces.next(provinces);
    }

    getProvinces(): Observable<IProvince[]> {
        return this.httpClient.get<IProvince[]>(environment.url + 'api/Common/v1/Provinces/search');
    }

    public getBehaviourCities(): Observable<ICity[]> {

        return this.cities;
    }

    public setBehaviourCities(cities: ICity[]) {

        this.cities.next(cities);
    }

    constructor(private httpClient: HttpClient) {
    }

    getCities(): Observable<ICity[]> {
        return this.httpClient.get<ICity[]>(environment.url + 'api/Common/v1/Cities/search');
    }

    uploadFile(file): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        return this.httpClient.post<any>(environment.url + 'api/Common/v1/Files', formData, {headers});
    }

    getFile(fileId): Observable<any> {
        return this.httpClient.get<any>(environment.url + 'api/Common/v1/Files/' + fileId);
    }
}

