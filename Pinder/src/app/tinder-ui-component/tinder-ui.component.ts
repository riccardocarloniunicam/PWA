import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef, Renderer2, ViewChild, Output } from '@angular/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import { EventEmitter } from 'protractor';
@Component({
  selector: 'tinder-ui',
  templateUrl: 'tinder-ui.component.html',
  styleUrls: ['tinder-ui.component.scss'],
})
export class TinderUIComponent {
  @Input('cards') cards: Array<{
    img: string,
    name: string,
    bio: string
  }>;
  @ViewChildren('tinderCard', {read: ElementRef}) tinderCards: QueryList<ElementRef>;
  tinderCardsArray: Array<ElementRef>;

  constructor(private renderer: Renderer2){}
  ngAfterViewChecked() {
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(()=>{
      this.tinderCardsArray = this.tinderCards.toArray();
    })
    this.tinderCards.forEach(element => {
      this.initGesture(element.nativeElement);
    });
  } 
  initGesture(element){
  
    const style = element.style;
    const windowWidth = window.innerWidth;
    const options: GestureConfig = {
      el: element,
      gestureName: 'tinder-swipe',
      onStart: () =>{
        this.renderer.setStyle(element, 'transition', 'none');
      },
      onMove: (ev) => {
        this.renderer.setStyle(element, 'transform','translateX(' + ev.deltaX + 'px) rotate(' + ev.deltaX/20 + 'deg)');
        //style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX/20}deg)`;
      },
      onEnd: (ev) => {
        this.renderer.setStyle(element, 'transition','0.3s ease-out');
        //style.transition = "0.3s ease-out";

        if(ev.deltaX > windowWidth/2){
          this.renderer.setStyle(element, 'transform', 'translateX( ' + windowWidth * 1.5 + 'px)');
          this.cards.shift();
          //style.transform = `translateX(${windowWidth * 1.5}px)`;
          console.log(element);
        } else if (ev.deltaX < -windowWidth/2){
          this.renderer.setStyle(element, 'transform','translateX(' + (-windowWidth * 1.5) + 'px)' );
          //style.transform = `translateX(-${windowWidth * 1.5}px)`;
          this.cards.shift();
          console.log(element);
        } else {
          this.renderer.setStyle(element, 'transform', '');
          
          //style.transform = ''
        }
      }
    }
    const gesture: Gesture = createGesture(
      options
    );
    gesture.enable();
  }
}