import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class InfoGuard implements CanActivate {
  constructor(
              private router: Router, 
              private userService:UserService,
              private storageService: StorageService
              ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise<boolean>(resolve => {
        this.storageService.get(Constants.TOKEN).then((token: any) => {
          if (token) {
            this.userService.getUser(token)
              .then((res: any) => {
                let data = JSON.parse(res.data);
                console.log(data["user"]);
                if(!data["user"].name || !data["user"].name || !data["user"].date || !data["user"].gender || !data["user"].interestIn){
                  resolve(true);
                }
                else{
                  this.router.navigate(['tabs']);
                  resolve(false);
                }
              })
              .catch((err: any) => {
                console.log(err);
                this.router.navigate(['login']);
                resolve(false);
              });
          }
        })
        .catch(err =>{
          this.router.navigate(['login']);
          resolve(false);
        })
      });
  }
  
}
