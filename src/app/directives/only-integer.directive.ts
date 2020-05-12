import { Directive } from '@angular/core';

@Directive({
  selector: '[appOnlyInteger]'
})
export class OnlyIntegerDirective {

  constructor() { }

}
