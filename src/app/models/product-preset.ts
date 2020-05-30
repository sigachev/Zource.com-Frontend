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
  brandId: number;
  active: boolean;

}
