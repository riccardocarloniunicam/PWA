import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{
      this.storageService.get("token")
          .then(res =>{
            if(res){
              resolve(true);
            }
            else{
              this.router.navigate(['login']);
              resolve(false);
            }
          })
          .catch(err =>{
            resolve(false);
          });
    });
  }
  
}
