/* Defines the product entity */
import {Brand} from './brand';
import {ProductImage} from './product-image';

export class Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  priceFor: UnitOfMeasure;
  soldBy: UnitOfMeasure;
  uomRatio: number;
  images: ProductImage[];
  brand: Brand;
/*  category: string;
  mainImage: string;*/
  createDate: string;


/*  starRating: number;
  imageUrl: string;*/
  enabled: boolean;
/*  tags: string[];*/

}


export interface ProductResolved {
  product: Product;
  error?: any;
}


export enum UnitOfMeasure {
  each,
  sqft,
  box,
  sheet
}
