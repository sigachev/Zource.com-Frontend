import {Product} from '../product';

export class ProductImageDTO {

  id: number;
  url: string;
  order = 0;

  constructor(id: number, url: string) {
    this.id = id;
    this.url = url;
  }

}
