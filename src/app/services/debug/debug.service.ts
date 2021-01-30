import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  constructor(private http: HttpClient) { }

  deleteUser = (id: string) => {

    return this.http.delete(environment.url + 'api/Debug/Panel/v1/Mates/' + id);
  };
}
