import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[presetChild]'
})
export class PresetChildDirective {

  constructor(element: ElementRef) {
    console.log(Element);
    element.nativeElement.innerText = 'Text is changed by changeText Directive. ';
  }
}
