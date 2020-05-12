import {Component, OnInit, Output} from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {max} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  id = 0;

  filteredProducts: Product[] = [];
  products: Product[] = [];


  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.performFilter();
      },
      (error: any) => this.errorMessage = error
    );
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: Product) =>
        product.name.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }

  onNameFilterValueChange(value: string): void {
    this.performFilter(value);
  }

  onPriceRangeChange(event): void {

    let minPrice = 0;
    let maxPrice = 999;

    console.log('Event 1st: ' + event.first);
    console.log('Evant 2nd: ' + event.second);


    if (event.first < event.second ) {
      minPrice = event.first;
      maxPrice = event.second;
    } else {
      minPrice = event.second;
      maxPrice = event.first;
    }

    if (minPrice && maxPrice) {
      this.filteredProducts = this.products.filter((product: Product) =>
        (product.price >= minPrice) && (product.price <= maxPrice)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onMinPriceFilterValueChange(filterBy?: number): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter((product: Product) =>
        product.price >= filterBy);
    } else {
      this.filteredProducts = this.products;
    }
  }

}

