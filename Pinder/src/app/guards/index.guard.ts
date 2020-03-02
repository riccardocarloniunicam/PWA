import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {
  constructor(public storageService: StorageService, public router: Router) {}
  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{
      console.log("hello");
      this.storageService.get("token")
            .then(res =>{
              if(res){
                this.router.navigate(['home']);
              }
              else{
              }
            })
            .catch(err => {
            });
    });
  }
}
