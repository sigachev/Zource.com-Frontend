import {Product} from './product';

export class ProductImage {
  id: number;
  name = '';
  fileName = '';
  type = '';
  imageOrder: number;
  isMainImage: boolean;

  constructor() {}

}

export interface MDBImagesGallery {
  img: string;
  thumb: string;
  description: string;
}
