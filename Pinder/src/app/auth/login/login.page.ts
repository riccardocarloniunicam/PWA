import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { from } from 'rxjs'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx';
import { Constants } from '../../config/constants';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

loginForm: FormGroup;





error_messages ={
  "email":[
    {type:'required',message:'Email is required'},
    {type:'pattern',message:'Email must be valid'}
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
    private loadingCtrl: LoadingController
  ) { 
    this.loginForm = this.formBuilder.group({
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(50),
      
      ])),
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    })

  }

  ngOnInit() {
  }
  login(){
    let postData = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.loadingCtrl.create({}).then(
      loading => {
        loading.present();
        this.authService.login(postData)
      .then( (res:any) => {
            loading.dismiss();
            console.log(res);
            this.storageService.store(Constants.TOKEN , res.data);
            this.router.navigate(["welcome"]);
      })
      .catch( (err:any) => {
        loading.dismiss();
        this.toast.show(err.error,'3000','bottom').subscribe(toast =>{
        });
      });
      }
    );
    
  }
}