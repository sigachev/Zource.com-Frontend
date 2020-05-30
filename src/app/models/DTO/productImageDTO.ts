import {Product} from '../product';

export class ProductImageDTO {

  id: number;
  url: string;
  order = 0;
  file = '';

  constructor(id: number, url: string, order: number, f: string) {
    this.id = id;
    this.url = url;
    this.file = f;
  }

}
