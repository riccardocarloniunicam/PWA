import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera: Camera,
    
  ) { }
  async getPicture(type){
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.getDestinationType(type)
    }
  
    return await this.camera.getPicture(options)
    .then(image =>{
      return image;
    }).catch(err=>{
      return err;
    });
  }
  private getDestinationType(type){
    switch(type){
      case 'camera': return this.camera.PictureSourceType.CAMERA;
      case 'gallery': return this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
  }
}


