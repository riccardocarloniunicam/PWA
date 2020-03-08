import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) { }
  async login(postData: any){
      return await this.httpService.post('login', postData, {});
    }
    
  async signup(postData: any) {
    return await this.httpService.post('register', postData, {});
    }
  async logout(){
    this.storageService.removeStorageItem("token").then(res =>{
      this.router.navigate(['/login']);
    })
  }
}
