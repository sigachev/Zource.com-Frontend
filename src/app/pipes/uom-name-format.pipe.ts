import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitOfMeasure'
})
export class UomNameFormatPipe implements PipeTransform {

  transform(value: string, qty: number): string {

    if (typeof value === 'undefined') { return value; }

    const result = value;

    if (qty === 1) { return value; }

    switch (value) {
      case 'box': {
        return 'boxes';
        break;
      }
      case 'each': {
        return 'pieces';
        break;
      }
      case 'sheet': {
        return 'sheets';
        break;
      }
      default : {
        return value;
        break;
      }

    }


  }

}
