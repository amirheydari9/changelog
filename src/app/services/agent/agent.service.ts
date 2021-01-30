import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {IProvince} from '../../DTO/common/IProvince';
import {ICity} from '../../DTO/common/ICity';

@Injectable({
    providedIn: 'root'
})
export class AgentService {

    private agentGroups: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private httpClient: HttpClient) {
    }

    getAgentsForCombo = () => {

        return this.httpClient.get(environment.url + 'api/Panel/v1/Agents/Search').pipe(map(data => data['data']));
    };

    getAgents = (SearchValue?: string, Genders?: number[], CityIdsOfResidence?: number[], GroupIds?: number[], page?: number, size?: number) => {

        let search = `PageNumber=${page}&PageSize=${size}`;

        if (SearchValue.trim().length > 0) {
            search += `&SearchValue=${SearchValue}`
        }
        if (Genders && Genders.length > 0) {
            Genders.forEach(item => search += `&Genders=${item}`);
        }
        if (CityIdsOfResidence && CityIdsOfResidence.length > 0) {
            CityIdsOfResidence.forEach(item => search += `&CityIdsOfResidence=${item}`);
        }
        if (GroupIds && GroupIds.length > 0) {
            GroupIds.forEach(item => search += `&GroupIds=${item}`);
        }
        return this.httpClient.get(environment.url + 'api/Panel/v1/Agents/Search?' + search).pipe(map(data => data['data']));
    };

    getAgentById = (id: string) => {
        return this.httpClient.get(environment.url + 'api/Panel/v1/Agents/' + id).pipe(map(data => data['data']));
    };

    createAgent = (agent: any) => {
        return this.httpClient.post(environment.url + 'api/Panel/v1/Agents', agent).pipe(map(data => data['data']));
    };

    updateAgent = (agentId: any, agent: any) => {
        return this.httpClient.put(environment.url + 'api/Panel/v1/Agents/' + agentId, agent);
    };

    changePictureAgent = (agentId: string, pictureId: string) => {
        return this.httpClient.put(environment.url + 'api/Panel/v1/Agents/' + agentId + '/ChangePicture', {pictureId: pictureId});
    };

    getAgentGroups(): Observable<any> {
        return this.httpClient.get<any>(environment.url + 'api/Panel/v1/Groups/Search')
    }

    public getBehaviourAgentGroups(): Observable<any> {

        return this.agentGroups;
    }

    public setBehaviourAgentGroups(agentGroups: any) {

        this.agentGroups.next(agentGroups);
    }

    uploadAgentDocument(agentId: string, document: any) {
        return this.httpClient.post(environment.url + 'api/Panel/v1/Agent/' + agentId + '/AgentDocuments', document).pipe(map(data => data['data']));
    }

    deleteAgentDocument(agentId: string, documentId: string) {
        return this.httpClient.delete(environment.url + 'api/Panel/v1/Agent/' + agentId + '/AgentDocuments/' + documentId, {})
    }
}
