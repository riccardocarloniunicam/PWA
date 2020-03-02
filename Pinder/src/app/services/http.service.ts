import {HTTP} from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HTTP) {}
  async post(serviceName: string, data: any){
    try{
      const url = "http://192.168.1.120:3000/" + serviceName;
      const headers = {};
      const response = await this.http.post(url, data, headers);
      return response;
    } catch (error) {
    }
  }
}
