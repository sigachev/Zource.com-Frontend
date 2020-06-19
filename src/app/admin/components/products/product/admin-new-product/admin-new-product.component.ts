import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../../models/product';
import {Brand} from '../../../../../models/brand';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../../services/product.service';
import {BrandService} from '../../../../../services/brand.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css']
})
export class AdminNewProductComponent implements OnInit {

  product: Product = new Product();
  productForm: any;
  errorMessage = '';
  brands: Brand[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private brandService: BrandService,
              private toastService: ToastService,
              private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: [],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
      brand: [],
      enabled: 'true'
    });

  }

  ngOnInit(): void {
    // List of all brands for selectbox
    this.brands = this.route.snapshot.data.resolvedBrandsList;
    this.product.id = 0;
  }


  saveProduct(values) {
    this.product.name = values.name;
    this.product.price = values.price;
    this.product.description = values.description;
    this.product.sku = values.sku,
      this.product.brand = new Brand(),
    this.product.brand.id = values.brand;
    this.product.enabled = values.enabled;

    this.productService.saveProduct(this.product).subscribe(result => {
        this.router.navigate(['admin/product/' + result.id]);
      },
      (err: any) => this.errorMessage = err,
    );
  }


}
