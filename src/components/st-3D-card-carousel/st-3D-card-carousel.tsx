import { Component, Prop, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { LoadingController } from '@ionic/core';
import * as Hammer from 'hammerjs';

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
  @Event() selectedItem: EventEmitter;

  @Listen('selectedItem')
  selectedItemHandler(event: CustomEvent) {
    console.log(event.detail);
  }

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
    //console.log(item);
    this.selectedItem.emit(item);
    this.applyResizeStyle(item);
    setTimeout(() => {
      this.resetResizeStyle(item);
    },2000);
    
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
    return (
      <div class="carousel-container">
        <div class="carousel">
            {items}
        </div>
      </div>
      );
  }
}
