import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    //this.elementRef.nativeElement.style.backgroundColor = 'yellow'
    this.backgroundColor = 'yellow'
  }

  @HostListener('mouseleave') onMouseLeave(){
    //this.elementRef.nativeElement.style.backgroundColor = 'white'
    this.backgroundColor = 'white'
  }

  @HostBinding('style.backgroundColor') backgroundColor: string = ''

  constructor( 
    //private elementRef: ElementRef
    ) 
    { }

}
