import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../config/constants';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData$ = new BehaviorSubject<any>([]);
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
    ) { }


  async getUserData(){
    this.userData$.next(await this.getUser());
  }
  async getUser(){
    return await this.httpService.get('user',{} , await this.getToken());
  }
  async uploadPhoto(postData: any, key:any){
    return await this.httpService.postFile('photo', key, postData, await this.getToken());
  }

  async getToken(){
    this.storageService.get(Constants.TOKEN).then(token => {
      return {"Authorization": token};
    })
  }
}
