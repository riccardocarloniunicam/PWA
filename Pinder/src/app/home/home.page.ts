import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import { GestureController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  cards;
  constructor() {
    this.cards = [];
   }
  ngOnInit() {
    this.cards = [
      {
        img: "https://placeimg.com/300/300/people",
        title: "Demo card 1",
        id: 1,
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/animals",
        title: "Demo card 2",
        id: 2,
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/nature",
        title: "Demo card 3",
        id: 3,
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/tech",
        title: "Demo card 4",
        id: 4,
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/arch",
        title: "Demo card 5",
        id: 5,
        description: "This is a demo for Tinder like swipe cards"
      }
    ]
  };
}


