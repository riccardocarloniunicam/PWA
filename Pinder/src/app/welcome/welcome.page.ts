import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { Constants } from '../config/constants';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  info:any = {
    
  };
  date = 'Birthday';
  constructor(
    private datePicker: DatePicker,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private toast: Toast
    ) { }
  open(){
    //console.log("ciao");
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      (date:any)=> {
        this.info.date = date
        this.date = date.toISOString().substring(0, 10);
        },
      err => console.log(err)
    );
  }
  validate(){
    if(!this.info.name || !this.info.gender || !this.info.interest){
      return false;
    }
    else{
      return true;
    }
  }
  ngOnInit() {
  }
  send(){
    if( this.dateDifference(this.info.date) < 16){
      this.toast.show("You must have at least 16 year old",'3000','bottom').subscribe(toast =>{
      
      });
    }
    else{
      this.info.date = Date.parse(this.info.date) / 1000;
      this.storageService.get(Constants.TOKEN).then(token => {
        this.userService.setUser(this.info, token).then(res => {
          this.toast.show('Welcome to pinder','3000','bottom').subscribe(toast =>{
      
          });
          this.router.navigate(['tabs']);
        })
        .catch(err => {
          this.toast.show(err.error,'3000','bottom').subscribe(toast =>{
        
          });
        })
      });
    }
  }
  dateDifference(date){
    const today = new Date();
    let dateDiff = (today.getFullYear() - date.getFullYear());
    if(date.getMonth() > today.getMonth())
      dateDiff--;
    else{
      if(date.getMonth() == today.getMonth()){
        if(date.getDate() > today.getDate()){
          dateDiff--;
        }
      }
    }
    return dateDiff;
  }
}
