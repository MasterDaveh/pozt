import { Directive, Input, ElementRef, OnInit } from '@angular/core';

export class RollingListItem {
  constructor(){}

  // triggered when the top border of the item
  // is getting close to the header of the rolling list
  onTopReaching: Function;
  // triggered when the top border of the item
  // is getting far away from the top of the rolling list
  onTopDeparting: Function;
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
export class RollingListItemDirective {
  DOMel: Node;
  constructor(el: ElementRef) {
    this.DOMel = el.nativeElement;
  }

  @Input() model: RollingListItem;

  animateRollUp(){

  }

  animateRollDown(){

  }

}
