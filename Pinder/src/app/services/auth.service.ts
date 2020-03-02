import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = new BehaviorSubject<any>([]);
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }

  getUserData(){
    this.storageService.get("token").then(res =>{
        this.token.next(res);
    })
  }
  async login(postData: any){
      return await this.httpService.post('login', postData);
    }
    
  async signup(postData: any) {
    return await this.httpService.post('register', postData);
    }
  async logout(){
    this.storageService.removeStorageItem("token").then(res =>{
      this.token.next('');
      this.router.navigate(['/login']);
    })
  }
}
