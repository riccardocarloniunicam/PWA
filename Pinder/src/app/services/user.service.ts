import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { from, BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../config/constants';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
    ) { }
  isAuthenticated(token): Observable<any>{
    return new Observable<any>((observer) => {
      this.getUser(token).then(res =>{
        observer.next(res);
      })
      .catch(err =>{
        observer.next(err);
      });
    });
  }
  async getUser(token){
      return await this.httpService.get('user',{} , {"Authorization": token});
  }
  async setUser(postData: any, token){
    return await this.httpService.post('user',postData, {"Authorization": token});
  }
  async uploadPhoto(postData: any, key:any, token){
      return await this.httpService.postFile('photo', key, postData, {"Authorization": token});
  }

  async getUsers(token){
    return await this.httpService.get('getUsers', {}, {"Authorization": token});
  }

  async like(token, postData){
    return await this.httpService.post('like', postData, {"Authorization": token});
  }
}
