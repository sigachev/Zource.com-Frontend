import {ProductImage} from './product-image';
import {Brand} from './brand';
import {UnitOfMeasure} from './product';

export class ProductPreset {
  id: number;
  userId: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  brand: Brand;
  active: boolean;

}
