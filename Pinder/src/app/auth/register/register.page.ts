import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  postData = {
    username: '',
    email:'',
    password:''
  };
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    let email = this.postData.email.trim();
    return (
    this.postData.username &&
    this.postData.password &&
    this.postData.email &&
    username.length > 0 &&
    email.length > 0 &&
    password.length > 0
    );
    }
    signupAction(){
      if(this.validateInputs()){
        from(this.authService.signup(this.postData)).subscribe(
          (res: any) =>{
            let token = JSON.parse(res.data)["token"];
            if(token){
              this.storageService.store("token", token);
              this.router.navigate(['home/']);
            }
            else{
              console.log("username already exists");
            }
          },
          (error: any) =>{
            console.log("Network issue");
          }
        );
      }
      else{
        console.log("Please enter email, username or password");
      }
    
    }
  }

