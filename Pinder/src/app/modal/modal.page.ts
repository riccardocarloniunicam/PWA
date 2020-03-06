import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SafeResourceUrl,DomSanitizer } from '@angular/platform-browser';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
import {from} from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  image:any=''
  passedId = null;
  constructor(
    private domSanitizer:DomSanitizer
    ,private navParam: NavParams,
    private modalControl:ModalController,
    private camera: Camera,
    private user:UserService) { }

  ngOnInit() {
    this.passedId= this.navParam.get('custom_id');
  }

  
  /*
  
  openCam(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //alert(imageData)
     this.image=(<any>window).Ionic.WebView.convertFileSrc(imageData);
     this.sendPictureToSomewhere()

     */
     /*from(this.user.Upload(postdata,header)).subscribe(x=>{

     },(err)=>{
//Handle error
     });
*/

/*
    }, (err) => {
     // Handle error
     alert("error "+JSON.stringify(err))
    });

  }

  async sendPictureToSomewhere() {
    const blob = this.b64toBlob(this.image, 'image/jpeg', 512);
    await this.sendRemotely(blob);
    alert('done');
  }



  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }



  sendRemotely(blob: Blob) {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('filekey', blob, 'myfile.jpg');
      
      this.http.post('https://tester123.free.beeceptor.com', form, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        responseType: 'text'
      })
        .subscribe(result => {
          debugger;
          resolve(result);
          console.log(result);
        });
    });


  }

*/


async sendPictureToSomewhere() {
  const base64 = await this.getPicture();
  const blob = this.b64toBlob(base64, 'image/jpeg', 512);
  await this.sendRemotely(blob);
  alert('done');
}


async getPicture() {

  const options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 200
  }

  var base64 = await this.camera.getPicture(options);

  return base64;
}


async sendFromGallery() {
  const base = await this.getPicGallery();
  const blobGallery = this.b64toBlob(base, 'image/jpeg', 512);
  await this.sendRemotely(blobGallery);
  alert('done');
}




async getPicGallery(){
  
  const options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
 
  }

var base64 = await this.camera.getPicture(options);

  return base64;

}

//https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

sendRemotely(blob: Blob) {
  /*return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('filekey', blob, 'myfile.jpg');

    this.http.post('https://tester123.free.beeceptor.com', form, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    })
      .subscribe(result => {
        debugger;
        resolve(result);
        
      });
  });

*/
}


  closeModal(){
    this.modalControl.dismiss();
  }
}