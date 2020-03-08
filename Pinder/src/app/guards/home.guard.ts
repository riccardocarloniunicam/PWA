import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { from } from 'rxjs';
import { Constants } from '../config/constants';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("ciao");
    return new Promise(resolve => {
      this.storageService.get(Constants.TOKEN)
      .then(token =>{
        console.log(token);
        if(token){
          resolve(true);
        }
        else{
          this.router.navigate(['login']);
          resolve(false);
        }
      })
      .catch(err =>{
        resolve(false);
      })
    });
  }
}
