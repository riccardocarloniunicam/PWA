import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loggedIn: boolean = false;
  constructor(
    private router: Router,
    private storageService: StorageService
  ){
    this.storageService.get("token")
      .then(res =>{
        if(res){
          this.loggedIn = true;
          this.router.navigate(['/']);
        }
        else{
          this.router.navigate(['login']);
        }
      })
      .catch(err =>{

      });
  }
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loggedIn) {
      return this.router.navigate(['login']);
    }

    return this.loggedIn;
  }
  public getGuardAuthentication(): boolean{
    return this.loggedIn;
  }
  
}
