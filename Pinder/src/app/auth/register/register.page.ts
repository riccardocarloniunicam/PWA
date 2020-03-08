import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';
import { Constants } from '../../config/constants';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  error_messages ={
    "username":[
      {type:'required',message:'Username is required'},
     
      {type:'maxlength',message:'Username must be lower than 50 characters'}
    ],
    "email":[
      {type:'required',message:'Email is required'},
      {type:'pattern',message:'Email must be valid'}
    ],
    "password":[
      {type:'required',message:'Password is required'},
      {type:'minlength',message:'Password must be longer than 7 characters'},
      {type:'maxlength',message:'Password must be lower than 50 characters'}
    ],
    "retype_password":[
      {type:'mustMatch', message:'Password must match'}
    ]
  }
  constructor(
    public formBuilder : FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toast: Toast
  ) { 
    this.registerForm = this.formBuilder.group({
      username: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(50)
      ])),
      retype_password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(50)
      ]))
    },{
      validator: this.MustMatch('password','retype_password')
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
           
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  ngOnInit() {
  }
    signupAction(){
        let postData = {
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password
        }
        from(this.authService.signup(postData)).subscribe(
          (res: any) =>{
            if(res.status === 400){
         
                this.toast.show(res.error,'3000','bottom').subscribe(toast =>{
      
                });
            }
            else{
              console.log(res.data);
              this.storageService.store(Constants.TOKEN, res.data);
              this.router.navigate(["/tabs"]);
            }
          },
          (error: any) =>{
            console.log("Network issue");
          }
        );
    
    }
  }

