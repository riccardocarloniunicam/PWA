import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  constructor(
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {}

  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message: 'Please await...'
    })
    await loading.present();
  }

  async close(){
    await this.loadingCtrl.dismiss();
  }
}
