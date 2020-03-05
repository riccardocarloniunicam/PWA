import {HTTP} from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HTTP) {}
  async post(serviceName: string, data: any){
    try{
      const url = environment.apiUrl + serviceName;
      const headers = {};
      const response = await this.http.post(url, data, headers);
      return response;
    } catch (error) {
      return error;
    }
  }
}
