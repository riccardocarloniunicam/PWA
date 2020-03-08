import { Injectable } from '@angular/core';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataResolver {

  constructor(
    private userService: UserService
  ) { }
  resolve(){
    console.log('Hello');
    return this.userService.getUserData();
  }
}
