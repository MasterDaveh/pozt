import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[rollingListHeader]'
})
export class RollingListHeaderDirective implements OnInit {
  DOMel: HTMLElement;
  lastY: number;
  lastX: number;
  // used to limit the horizontal scroll of the header
  divider: number;
  
  constructor(private el: ElementRef, private renderer: Renderer) {}

  onScroll(self: RollingListHeaderDirective){
    const currentY = window.pageYOffset;
    if( this.lastY > -1 ){
      const movement = this.lastX + ((this.lastY - currentY)/this.divider);
      self.renderer.setElementStyle(self.DOMel, 'transform', `translateX(${ movement }px)`);
      this.lastX = movement;
    }
    this.lastY = currentY;
  }

  ngOnInit(){
    this.DOMel = this.el.nativeElement;
    this.lastY = -1;
    this.lastX = 0;
    this.divider = 7.5;
    window.addEventListener('scroll', () => this.onScroll(this));
  }

}
