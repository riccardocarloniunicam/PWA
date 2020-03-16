import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Toast } from '@ionic-native/toast/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalPageModule } from './modal/modal.module';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AuthService } from './services/auth.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ModalPageModule],
  providers: [
    StatusBar,
    Camera,
    File,
    DatePicker,
    FileTransfer,
    SplashScreen,
    AuthService,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
