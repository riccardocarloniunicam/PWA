import { Component, Input, OnInit, EventEmitter, ViewChildren, QueryList, ElementRef, Renderer2, ViewChild, Output } from '@angular/core';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';

@Component({
  selector: 'tinder-ui',
  templateUrl: 'tinder-ui.component.html',
  styleUrls: ['tinder-ui.component.scss'],
})
export class TinderUIComponent {
  @Input('cards') cards: Array<{
    img: string,
    name: string,
    id: number,
    bio: string
  }>;
  @Output() swipe = new EventEmitter();
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
          console.log(element.id);
          let data = {
            "liked": element.id,
            "like": "like"
          };
          this.swipe.emit(data);
        } else if (ev.deltaX < -windowWidth/2){
          this.renderer.setStyle(element, 'transform','translateX(' + (-windowWidth * 1.5) + 'px)' );
          this.cards.shift();
          let data = {
            "liked": element.id,
            "like": "dislike"
          };
          this.swipe.emit(data);
        } else {
          this.renderer.setStyle(element, 'transform', '');
          
        }
      }
    }
    const gesture: Gesture = createGesture(
      options
    );
    gesture.enable();
  }
}