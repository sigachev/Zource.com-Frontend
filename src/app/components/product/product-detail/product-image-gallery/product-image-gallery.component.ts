import {Component, Input, OnInit} from '@angular/core';
import {MDBImagesGallery, ProductImage} from '../../../../models/product-image';
import {environment} from '../../../../../environments/environment';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions} from 'ngx-gallery-9';

@Component({
  selector: 'product-image-gallery',
  templateUrl: './product-image-gallery.component.html',
  styleUrls: ['./product-image-gallery.component.css']
})
export class ProductImageGalleryComponent implements OnInit {

  @Input() images: ProductImage[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  productImageRoot = environment.s3Bucket;



  constructor() {
  }

  ngOnInit(): void {

    this.galleryOptions = [
      {
        width: '100%',
        height: '480px',
        imagePercent: 75,
        thumbnailsPercent: 25,
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
      }
    ];



    this.images.forEach(img => {
      const m = {} as NgxGalleryImage;
      m.small = this.productImageRoot + img.fileName;
      m.medium = m.small;
      m.big = m.small;
      this.galleryImages.push(m);
    });

    console.log('Gallery images : ' + JSON.stringify(this.galleryImages));
  }

}
