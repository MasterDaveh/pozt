import { Directive, Input, ElementRef, OnInit, AfterContentInit } from '@angular/core';

export class RollingListItem {
  constructor(){}

  // triggered when the top border of the item
  // is getting close to the header of the rolling list
  onTopReaching: Function;
  // establishes when to trigger the events above
  // accepts a decimal number between 0 and 1 that represents
  // the percentage of the pic to show before triggering one of the events
  // i.e. if boundaryRatio is 0.5 the onTopReaching event won't be triggered
  // until the pic is half way(0.5) past the top of the screen
  boundaryRatio: number;
}

@Directive({
  selector: '[rollingListItem]'
})
export class RollingListItemDirective implements OnInit {
  DOMel: HTMLElement;
  elHeight: number;
  // number of pixels beyond which the events are called
  boundary: number;
  // When I have to trigger one of the events I need a reference
  // to the next and previous indexes, as I want to avoid adding
  // and subtracting one every time the scroll event is called
  nextIndex: number;
  previousIndex: number;

  constructor(el: ElementRef) {
    this.DOMel = el.nativeElement;
  }

  @Input() rollingListItem: RollingListItem;
  @Input() rollingListIndex: number;

  onScroll(self: RollingListItemDirective){
    const pos = self.DOMel.getBoundingClientRect().top;
    const absPos = Math.abs(pos);
    // I only check the position if the pic is close to the top of the screen
    if( absPos > this.elHeight ) return;
    if( absPos < (this.elHeight - this.boundary) ){
      self.rollingListItem.onTopReaching( this.rollingListIndex );
    }
  }

  ngOnInit(){
    window.addEventListener('scroll', () => this.onScroll(this));
  }

  ngAfterContentInit(){
    // waiting for the page to render the content
    setTimeout(() => {
      this.elHeight = this.DOMel.clientHeight
      this.boundary = this.elHeight * this.rollingListItem.boundaryRatio;
    }, 0);
  }

}
