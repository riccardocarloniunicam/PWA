import { Component, OnInit } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { Constants } from '../config/constants';
import { environment } from '../config/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image = "";
  name;
  age;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private storageService: StorageService) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storageService.get(Constants.TOKEN).then(token => {
      if (token) {
        this.userService.getUser(token).then(res => {
          const user = JSON.parse(res.data)["user"];
          const photo = JSON.parse(res.data)["photo"];
          this.image = environment.apiUrl + photo.url;
          this.name = user.name; 
          this.age = this.dateDifference(new Date(user.date));
        })
          .catch(err => {

          })
      }
    })
  }
  async openModal(){
    let modal = await this.modalController.create({
      component: ModalPage,
    });
    modal.present();
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

