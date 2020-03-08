import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }
  async getUser(header: any){
    return await this.httpService.get('user',{} , header);
  }
  async uploadPhoto(postData: any, key:any, header:any){
    return await this.httpService.postFile('photo', key, postData, header);
  }
}
