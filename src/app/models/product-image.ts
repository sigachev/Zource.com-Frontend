import {Product} from './product';

export class ProductImage {
  id: number;
  name = '';
  fileName = '';
  type = '';
  imageOrder: number;

  constructor() {}

}

export interface MDBImagesGallery {
  img: string;
  thumb: string;
  description: string;
}
