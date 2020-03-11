import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';
import { Constants } from '../../config/constants';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
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
    private toast: Toast,
    private loaderComponent: LoaderComponent
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
    this.authService.login(postData)
      .then( (res:any) => {
            console.log(res);
            this.storageService.store(Constants.TOKEN , res.data);
            this.router.navigate(["tabs/home"]);
      })
      .catch( (err:any) => {
        this.toast.show(err.error,'3000','bottom').subscribe(toast =>{
        });
      });
  }
}