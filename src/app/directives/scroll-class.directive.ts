import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

export class ScrollClassItem {
  constructor(){}

  // class to apply when scrolling down
  down: string;
  // class to apply when scrolling up 
  // this is optional since the default behaviour is:
  // - apply class when scrolling down
  // - remove class when scrolling up
  up?: string;
}

@Directive({
  selector: '[scrollClass]'
})
export class ScrollClassDirective implements OnInit {
  // previous value of the window scroll
  // if less than the current we are scrolling up
  // otherwise we are scrolling down
  lastY: number;
  DOMel: HTMLElement;
  constructor(private el: ElementRef, private renderer: Renderer) {}

  @Input() scrollClass: ScrollClassItem;

  onScroll(self: ScrollClassDirective){
    const currentY = window.pageYOffset;
    if( self.lastY > -1  ){
      const scrolledUp = self.lastY < currentY;
      if( scrolledUp ){
        self.renderer.setElementClass(self.DOMel, self.scrollClass.down, true);
      } else {
        self.renderer.setElementClass(self.DOMel, self.scrollClass.down, false);
        if( self.scrollClass.up ){
          self.renderer.setElementClass(self.DOMel, self.scrollClass.up, true);
        }
      }
    }
    self.lastY = currentY;
  }

  ngOnInit(){
    this.DOMel = this.el.nativeElement;
    this.lastY = -1;
    window.addEventListener('scroll', () => this.onScroll(this));
  }

}
