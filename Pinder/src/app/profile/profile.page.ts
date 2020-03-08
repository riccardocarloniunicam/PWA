import { Component, OnInit } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image = "https://placeimg.com/300/300/arch";
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    
  }
  async openModal(){
    let modal = await this.modalController.create({
      component: ModalPage
    });
    modal.present();
  }
}
