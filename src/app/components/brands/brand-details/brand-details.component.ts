import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BrandService} from '../../../services/brand.service';
import {Brand} from '../../../models/brand';
import {ToastService} from 'ng-uikit-pro-standard';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {

  brand: Brand;
  id = 0;
  errorMessage = '';


  constructor(private route: ActivatedRoute,
              private brandService: BrandService,
              private toast: ToastService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.brand = {} as Brand;
    this.brandService.getBrand(this.id).subscribe(
      (b: Brand) => {
        this.brand = b;
        console.log(this.brand);
      },
      (error: any) => {
        this.toast.error(error);
      }
    );

    if (this.brand.id === 0) {
       this.errorMessage = 'No brand with id=' + this.id + ' was found!';
       this.toast.error(this.errorMessage);
    }
  }


}
