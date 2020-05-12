import {Product} from '../product';

class UnitOfMeasure {
}

export class ProductDTO {


  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  priceFor: UnitOfMeasure;
  soldBy: UnitOfMeasure;
  uomRatio: number;
  /*images: ProductImage[];*/
  brand: number;
  enabled: boolean;


  constructor(p: Product) {
    this.id = p.id;
    this.name = p.name;
    this.sku = p.sku;
    this.description = p.description;
    this.price = p.price;
    this.priceFor = p.priceFor;
    this.soldBy = p.soldBy;
    this.uomRatio = p.uomRatio;
    this.brand = p.brand.id;
    this.enabled = p.enabled;
  }


}
