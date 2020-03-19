import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import { GestureController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { Constants } from '../config/constants';
import { environment } from '../config/environment';
import { Observable, observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  cards;
  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.cards = [];
   }
  ionViewWillEnter(){
    this.storageService.get(Constants.TOKEN).then(token =>{
      this.userService.getUsers(token).then((res: any) =>{
        const users = JSON.parse(res.data);
        users.forEach(user => {
          let card = {
            img: environment.apiUrl + user["Photos"][0].url,
            name: user.name,
            bio: user.bio,
            id: user.id
          };
          this.cards.push(card);
        });
      })
      .catch(err =>{
        console.log(err)
      })
    })
  }
  ngOnInit() {
    this.cards = [];
  };
  sendSwipe(event){
    this.storageService.get(Constants.TOKEN)
                        .then(token => {
                          this.userService.like(token, event).then(res => {
                            console.log(res);
                          })
                          .catch(err => {
                            console.log(err);
                          });
                        })
  }
}


