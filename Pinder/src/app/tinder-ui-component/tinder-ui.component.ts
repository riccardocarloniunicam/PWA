import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import { GestureController } from '@ionic/angular';
@Component({
  selector: 'tinder-ui',
  templateUrl: 'tinder-ui.component.html',
  styleUrls: ['tinder-ui.component.scss'],
})
export class TinderUIComponent {
  @Input('cards') cards: Array<{
    img: string,
    title: string,
    description: string
  }>;
  @ViewChildren('tinderCard', {read: ElementRef}) tinderCards: QueryList<ElementRef>;
  tinderCardsArray: Array<ElementRef>;

  constructor(){}
  ngAfterViewInit() {
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(()=>{
      this.tinderCardsArray = this.tinderCards.toArray();
    })
    this.tinderCards.forEach(element => {
      this.initGesture(element.nativeElement);
    });
    //console.log(this.tinderCards.first.el);
  } 
  initGesture(element){
  
    const style = element.style;
    const windowWidth = window.innerWidth;
    const options: GestureConfig = {
      el: element,
      gestureName: 'tinder-swipe',
      onStart: () =>{
        style.transition = "none";
      },
      onMove: (ev) => {
        style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/20}deg)`;
      },
      onEnd: (ev) => {

        style.transition = "0.3s ease-out";

        if(ev.deltaX > windowWidth/2){
          style.transform = `translateX(${windowWidth * 1.5}px)`;
          console.log(true);
        } else if (ev.deltaX < -windowWidth/2){
          style.transform = `translateX(-${windowWidth * 1.5}px)`;
          console.log(false);
        } else {
          style.transform = ''
        }
      }
    }
    const gesture: Gesture = createGesture(
      options
    );
    gesture.enable();
  }
}