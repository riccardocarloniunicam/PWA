import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import {from} from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CameraService } from '../services/camera.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  //passedId = null;
  constructor(
    private navParam: NavParams,
    private modalControl: ModalController,
    private cameraService: CameraService,
    private userService: UserService,
    private toast: Toast,
    private storageService: StorageService,
    ) { }

  ngOnInit() {
    //this.passedId= this.navParam.get('custom_id');
  }



async getPicture(type) {
  from(this.cameraService.getPicture(type)).subscribe(
    (res:any)=>{
      this.storageService.get('token').then(token =>{
        if(token){
          from(this.userService.uploadPhoto(res, 'image', { 'Authorization': token})).subscribe((resU:any)=>{
            if(resU.status === 400){
              this.toast.show(resU.error,'3000','bottom').subscribe(toast =>{
    
              })
            }
            else{
                this.toast.show('Successful upload of the photo','3000','bottom').subscribe(toast =>{
                this.closeModal();
              })
            }
          },
          (errU:any) =>{
            console.log(errU);
          });
        }
        else{
          
        }
      });
      
    },
    (err:any)=>{
      console.log(err);
    });
}



closeModal(){
    this.modalControl.dismiss();
  }
}