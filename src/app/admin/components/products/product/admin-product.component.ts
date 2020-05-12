import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Product} from '../../../../models/product';
import {ProductService} from '../../../../services/product.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {error} from 'util';
import {Brand} from '../../../../models/brand';
import {BrandService} from '../../../../services/brand.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  id = 0;
  product: Product;

  productForm: any;
  errorMessage = '';
  brands: Brand[];

  sqftInBox = 11;


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
      enabled: []
    });

  }

  ngOnInit(): void {
    // List of all brands for selectbox
    this.brands = this.route.snapshot.data.resolvedBrandsList;

    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe((p: Product) => {
        this.product = p;
        console.log('Product: ' + JSON.stringify(p));
        this.productForm.patchValue({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          sku: this.product.sku,
          description: this.product.description,
          enabled: this.product.enabled,
          brand: this.product.brand
        });
      },
      (err: any) => this.errorMessage = err,
    );


  }

  saveProduct(values) {

    /*
        console.log('Values: ' + JSON.stringify(values));
        console.log('Product: ' + JSON.stringify(this.product));*/
    this.product.name = values.name;
    this.product.price = values.price;
    this.product.description = values.description;
    this.product.sku = values.sku,
    this.product.brand.id = values.brand;
    this.product.enabled = values.enabled;

    this.productService.saveProduct(this.product).subscribe(result => {
        this.router.navigate(['admin/product/' + this.product.id]);
      },
      (err: any) => this.errorMessage = err,
    );
  }


}
