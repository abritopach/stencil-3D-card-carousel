import { Component, Prop, State, Element } from '@stencil/core';
import { LoadingController } from '@ionic/core';
import * as Hammer from 'hammerjs';

interface TouchEvent extends UIEvent {
  touches:TouchList;
  targetTouches:TouchList;
  changedTouches:TouchList;
};

@Component({
  tag: 'st-3D-card-carousel',
  styleUrl: 'st-3D-card-carousel.scss'
})
export class St3DCardCarousel {

  @Prop() slides: any;
  items: any = [];
  private readonly tz: number = 250;
  currentDeg: number = 0;

  @Element() myNameEl: HTMLElement;

  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: LoadingController;

  swipedir: string;
  startX: number;
  startY: number;
  distX: number;
  distY: number;
  threshold: number = 150; // Required min distance traveled to be considered swipe.
  restraint: number = 100; // Maximum distance allowed at the same time in perpendicular direction.
  allowedTime: number = 300; // Maximum time allowed to travel that distance.
  elapsedTime: any;
  startTime: any;

  componentWillLoad() {

    console.log("componentWillLoad");

    //console.log(this.slides);
    this.items = this.slides;

    this.loadingCtrl.create({ content: 'Load 3D Card Carousel...' }).then(loading => {
      loading.present().then(() => {
        let degree = 0;
        this.items.map((item) => {
          item["currentPlacement"] = degree;
          degree = degree + 60;
        });

        loading.dismiss();
        })
      });
  }

  componentDidLoad() {
    console.log('componentDidLoad');

    let ele = this.myNameEl.querySelector('.carousel');
    let mc = new Hammer(ele);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    
    mc.on("swipeleft swiperight", (function(ev) {
        if (ev.type == "swipeleft") {
          this.currentDeg = this.currentDeg - 60;
          this.applyStyle();
        }
        if (ev.type == "swiperight") {
          this.currentDeg = this.currentDeg + 60;
          this.applyStyle();
        }
    }).bind(this));
  }

  /**
   * The component will update and re-render.
   * Called multiple times throughout the life of the component as it updates.
   */
  componentWillUpdate() {
    console.log('ComponentWillUpdate');
    this.items = this.slides;  
    let degree = 0;
    this.items.map((item) => {
      item["currentPlacement"] = degree;
      degree = degree + 60;
    });  
  }

  onHandleClick(item) {
    //console.log("onHandleClick");
    console.log(item);
    this.applyResizeStyle(item);
    setTimeout(() => {
      this.resetResizeStyle(item);
    },2000);
    
  }

  // Detect swipe event.
  // Source: http://www.javascriptkit.com/javatutors/touchevents2.shtml
  onHandleTouchStart(event: TouchEvent) {
    //console.log("onHandleTouchStart");
    let touchobj = event.changedTouches[0];
    this.swipedir = 'none';
    this.distX = 0;
    this.distY = 0;
    this.startX = touchobj.pageX;
    this.startY = touchobj.pageY;
    this.startTime = new Date().getTime(); // Record time when finger first makes contact with surface.
    event.preventDefault();
  }

  onHandleTouchEnd(item, event: TouchEvent) {
    //console.log("onHandleTouchEnd");
    let touchobj = event.changedTouches[0];
    this.distX = touchobj.pageX - this.startX; // Get horizontal dist traveled by finger while in contact with surface.
    this.distY = touchobj.pageY - this.startY; // Get vertical dist traveled by finger while in contact with surface.
    this.elapsedTime = new Date().getTime() - this.startTime; // Get time elapsed.
    if (this.elapsedTime <= this.allowedTime) { // First condition for awipe met.
        if (Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint){ // 2nd condition for horizontal swipe met.
            this.swipedir = (this.distX < 0)? 'left' : 'right'; // If dist traveled is negative, it indicates left swipe.
        }
        else if (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint){ // 2nd condition for vertical swipe met.
            this.swipedir = (this.distY < 0)? 'up' : 'down'; // If dist traveled is negative, it indicates up swipe.
        }
    }
    //console.log(this.swipedir);
    this.handleSwipe(item);
    event.preventDefault();
  }

  onHandleTouchMove(event: UIEvent) {
    //console.log("onHandleTouchMove");
    event.preventDefault(); // prevent scrolling when inside DIV
  }

  handleSwipe(item) {
    if (this.swipedir =='left') {
      this.currentDeg = this.currentDeg - 60;
      this.applyStyle();
    }
    if (this.swipedir == 'right') {
      this.currentDeg = this.currentDeg + 60;
      this.applyStyle();
    }
    if (this.swipedir == 'none') {
      //console.log("onHandleClick");
      console.log(item);
      this.applyResizeStyle(item);

      setTimeout(() => {
        this.resetResizeStyle(item);
      },2000);
    }
  }

  applyStyle() {
    let ele = this.myNameEl.querySelector('.carousel');
    ele.setAttribute("style", "-webkit-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "-moz-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "-o-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "transform: rotateY(" + this.currentDeg + "deg)");
  }

  applyResizeStyle(item: any) {
    let ele = this.myNameEl.querySelector('.slide-item' + item.id);
    ele.classList.add("slide-item-animation");
  }

  resetResizeStyle(item: any) {
    let ele = this.myNameEl.querySelector('.slide-item' + item.id);
    ele.classList.remove("slide-item-animation");
}

  render() {
    const items = this.items.map((item, index) => {
      let divStyle = {
        'background-color': item.color,
        'transform': 'rotateY(-'+item.currentPlacement+'deg)  translateZ('+this.tz+'px)',
        '-webkit-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+this.tz+'px)'
      };
      let myClass = 'carousel-slide-item slide-item' + item.id;
      //<div class={myClass} style={divStyle} onClick={this.onHandleClick.bind(this, item)} onTouchStart={this.onHandleTouchStart.bind(this)}
      //  onTouchEnd={this.onHandleTouchEnd.bind(this, item)} onTouchMove={this.onHandleTouchMove.bind(this)}>
      return (
        <div class={myClass} style={divStyle} onClick={ () => this.onHandleClick(this.items[index])}>
        <img src={item.imgUrl}/>
        <h2>{item.title}</h2>
        <p><i class="fa fa-flag"></i> {item.country}</p>
        <p>{item.description}</p>
        <div>
          <div class="left">12 <i class="fa fa-users"></i></div>
          <div class="right">4 <i class="fa fa-comments"></i></div>
        </div>
        </div>
      );
    });
    return ([
      <div class="carousel-container">
        <div class="carousel">
            {items}
        </div>
      </div>,
      {/*
      <ion-card>
        <ion-item>
          <ion-avatar item-start>
            <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png"/>
          </ion-avatar>
          <h2>Marty McFly</h2>
        </ion-item>
        <img src="https://images.template.net/wp-content/uploads/2016/02/05070714/Landscape-Nature-Sunset-Trees-HD-Free-Background.jpg"/>

        <ion-card-content>
          <p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.</p>
        </ion-card-content>
      </ion-card>,
      */}
    ]);
  }
}
