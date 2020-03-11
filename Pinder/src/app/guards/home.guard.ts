import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { Constants } from '../config/constants';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>(resolve => {
      this.storageService.get(Constants.TOKEN).then((token: any) => {
        if (token) {
          this.userService.getUser(token)
            .then((res: any) => {
              
              resolve(true);
            })
            .catch((err: any) => {
              
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
