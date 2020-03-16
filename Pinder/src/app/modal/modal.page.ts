import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { from } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CameraService } from '../services/camera.service';
import { UserService } from '../services/user.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { Constants } from '../config/constants';
import { environment } from '../config/environment';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

 info :any = {

 };
  isEditableName: boolean = false;
  isEditableBio: boolean = false;
  constructor(
    private navParam: NavParams,
    private modalControl: ModalController,
    private cameraService: CameraService,
    private userService: UserService,
    private toast: Toast,
    private storageService: StorageService,
    private popoverController: PopoverController
  ) { }
  ngOnInit() {
    this.storageService.get(Constants.TOKEN).then(token => {
      if (token) {
        this.userService.getUser(token).then(res => {
          const user = JSON.parse(res.data)["user"];
          const photo = JSON.parse(res.data)["photo"];
          this.info.image = environment.apiUrl + photo.url;
          console.log(user);
          this.info.bio = user.bio; 
        })
          .catch(err => {

          })
      }
    })

  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      translucent: true,
    });
    return await popover.present();
  }

 send(){

  this.storageService.get(Constants.TOKEN).then(token => {
    if(token){
      this.userService.setUser(this.info, token).then(res => {
        this.closeModal();
        this.toast.show('you have succesfully update your info','3000','bottom').subscribe(toast =>{
        
        });
      })
      .catch(err => {
        this.toast.show(err.error,'3000','bottom').subscribe(toast =>{
        
        });
      })
    }
  })
 }


  closeModal() {
    this.modalControl.dismiss();
  }
}