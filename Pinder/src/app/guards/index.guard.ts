import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { Constants } from '../config/constants';
@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve =>{
      this.storageService.get(Constants.TOKEN)
      .then(token =>{
        console.log(token);
        if(token) {
          this.router.navigate(['tabs/home']);
          resolve(false);
        }
        else{
          resolve(true);
        }
      })
      .catch(err => {
        resolve(true);
      });
    });
  }

}
