import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

loginForm: FormGroup;





error_messages ={
  "username":[
    {type:'required',message:'Username is required'},
    {type:'minlenght',message:'Username must be longer or equal than 6 characters'},
    {type:'maxlenght',message:'Username must be lower than 30 characters'}
  ],
  "password":[
    {type:'required',message:'Password is required'},
    {type:'minlenght',message:'Password must be longer or equal than 6 characters'},
    {type:'maxlenght',message:'Password must be lower than 30 characters'}
  ],
}




  constructor(
    public formBuilder : FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) { 
    this.loginForm = this.formBuilder.group({
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      
      ])),
      username: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]))
    })

  }

  ngOnInit() {
  }
  login(){
    let postData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    from(this.authService.signup(postData)).subscribe(
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
}