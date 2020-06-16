import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';
import {BrandService} from '../../../../services/brand.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {FormBuilder, Validators} from '@angular/forms';
import {Product} from '../../../../models/product';
import {Brand} from '../../../../models/brand';
import {AdminPresetService} from '../../../services/admin-preset.service';
import {ProductPreset} from '../../../../models/product-preset';

@Component({
  selector: 'admin-products-preset',
  templateUrl: './admin-product-preset.component.html',
  styleUrls: ['./admin-product-preset.component.css']
})
export class AdminProductPresetComponent implements OnInit {

  id = 0;
  p: ProductPreset;
  errorMessage = '';
  brands: Brand[];
  pForm: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private presetService: AdminPresetService,
              private brandService: BrandService,
              private toastService: ToastService,
              private fb: FormBuilder) {

    this.pForm = this.fb.group({
      name: ['', Validators.required],
      sku: [],
      description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])],
      price: ['', Validators.compose([Validators.required])],
      brand: [],
      enabled: []
    });
  }

    ngOnInit(): void {
      this.id = +this.route.snapshot.paramMap.get('id');
      // List of all brands for selectbox
      this.brands = this.route.snapshot.data.resolvedBrandsList;


      this.presetService.getProductPreset(this.id).subscribe((p: ProductPreset) => {
        this.p = p;
        console.log('Product: ' + JSON.stringify(p));
        this.pForm.patchValue({
          id: this.p.id,
          name: this.p.name,
          enabled: this.p.active,
          brand: this.p.brand
        });
      },
      (err: any) => this.errorMessage = err,
    );


  }

  save(value: any) {

  }
}
