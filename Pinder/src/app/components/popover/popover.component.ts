import { Component, OnInit } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { CameraService } from 'src/app/services/camera.service';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PopoverController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Constants } from 'src/app/config/constants';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    private toast: Toast,
    private cameraService: CameraService,
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private storageService: StorageService
  ) { }

  ngOnInit() {}
  async getPicture(type) {
    this.storageService.get(Constants.TOKEN).then( token => {
      if(token){
      from(this.cameraService.getPicture(type)).subscribe(
        (picture:any)=>{
          from(this.userService.uploadPhoto(picture, 'image', token)).subscribe((res:any)=>{
            if(res.status === 400){
              this.toast.show(res.error,'3000','bottom').subscribe(toast =>{
    
              })
            }
            else{
                this.toast.show('Successful upload of the photo','3000','bottom').subscribe(toast =>{
                this.popoverCtrl.dismiss();
              })
            }
          },
          (err:any) =>{
            console.log(err);
          });;
          
        },
        (err:any)=>{
          console.log(err);
        });
      }
    });
    
  }
}
