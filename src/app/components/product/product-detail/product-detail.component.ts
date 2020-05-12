import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Product, ProductResolved} from '../../../models/product';
import {ProductService} from '../../../services/product.service';
import {environment} from '../../../../environments/environment';
import {ToastService} from 'ng-uikit-pro-standard';

import {ProductResolverService} from '../../../services/product-resolver.service';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductResolverService, ProductService]
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product Detail';
  id = 0;
  product: Product;
  errorMessage = '';

  sqftInput = 0;
  qtySoldBy = 0;
  qtySqft = 0;



  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastService) {


  }

  ngOnInit(): void {

   /* this.galleryOptions = [
      {

        width: '100%',
        height: '480px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsColumns: 4,
        imageSwipe: true,
        thumbnailsSwipe: true,
        imageSize: NgxGalleryImageSize.Contain,
        imageArrowsAutoHide: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewSwipe: true,
        previewFullscreen: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewZoom: true,
        previewZoomStep: 1,
        previewZoomMax: 2,
        previewZoomMin: 1
      },
    ];*/
/*    this.galleryImages = [{
      small: this.productImageRoot + 'default-images/default-product-image.png',
      medium: this.productImageRoot + 'default-images/default-product-image.png',
      big: this.productImageRoot + 'default-images/default-product-image.png',
    }];*/


    /*  this.product = {} as Product;*/

    this.id = +this.route.snapshot.paramMap.get('id');

    const resolvedData: ProductResolved = this.route.snapshot.data.resolvedData;
    console.log('ResolvedData: ' + JSON.stringify(resolvedData));
    if (!resolvedData.product) {
      this.errorMessage = resolvedData.error;
    } else {
      this.errorMessage = '';
      this.onProductRetrieved(resolvedData.product || {} as Product);
    }
  }

  ngAfterViewInit(): void {
  }


  private onProductRetrieved(product: Product): void {
    this.product = product;
    console.log('Product images: ' + JSON.stringify(product.images));

    if (this.product.images && this.product.images.length) {

   }
    console.log('Out: ' + JSON.stringify(this.product));


    if (this.product) {
      this.pageTitle = 'Product Details: ${this.product.productName}';
    }
  }

  /*  onBack(): void {
      this.router.navigate(['/products']);
    }*/


  onQtyChange() {
    this.qtySqft = this.sqftInput * this.product.uomRatio;
    this.qtySoldBy = Math.ceil(this.sqftInput / this.product.uomRatio);
  }


}
