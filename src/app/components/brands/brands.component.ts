import { Component, OnInit } from '@angular/core';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';
import {ToastService} from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  errorMessage = '';
  filteredBrands: Brand[] = [];
  brands: Brand[] = [];

  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.brandService.getBrands().subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
        this.performFilter();
      },
      (error: any) => {
        this.errorMessage = error;
        console.log(error);
      }
    );
  }

  private performFilter() {
    this.filteredBrands = this.brands;
  }
}
