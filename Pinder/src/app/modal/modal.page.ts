import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import {from} from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CameraService } from '../services/camera.service';
import { UserService } from '../services/user.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  image = "https://placeimg.com/300/300/arch";
  name = "Davide";
  bio = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...";
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
    //this.passedId= this.navParam.get('custom_id');
  }

async presentPopover()
{
  const popover = await this.popoverController.create({
    component: PopoverComponent,
    translucent: true,
  });
  return await popover.present();
}




closeModal(){
    this.modalControl.dismiss();
  }
}