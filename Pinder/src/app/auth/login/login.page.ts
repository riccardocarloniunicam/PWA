import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
import { Toast } from '@ionic-native/toast/ngx';
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
    {type:'maxlength',message:'Username must be lower than 30 characters'}
  ],
  "password":[
    {type:'required',message:'Password is required'},
    {type:'minlength',message:'Password must be longer or equal than 6 characters'},
    {type:'maxlength',message:'Password must be lower than 30 characters'}
  ],
}




  constructor(
    public formBuilder : FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toast: Toast
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
        if(res.status === 400){
        }
      },
      (error: any) =>{
        console.log("Network issue");
      }
    );
  }
}