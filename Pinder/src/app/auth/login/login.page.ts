import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }
  validateInputs(){
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return(
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }
  loginAction(){
    if(this.validateInputs()){
      from(this.authService.login(this.postData)).subscribe((res : any) =>{
        let token = JSON.parse(res.data)["token"];
        if(token){
          this.router.navigate(['home/']);
        }
        else{
          console.log(res.data);
        }
      },
      (error: any) =>{
        console.log("Network issue");
      });
    }
    else{
      console.log('Please enter email/username or password.');
    }
  }
}
