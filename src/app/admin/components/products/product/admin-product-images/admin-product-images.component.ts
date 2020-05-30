import {Component, Input, OnInit} from '@angular/core';
import {UploadFileService} from '../../../../../services/upload-file.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {moveItemInList} from 'mdb-sortable';
import {Product} from '../../../../../models/product';
import {Observable, Observer} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {ProductImage} from '../../../../../models/product-image';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../../../services/product.service';
import {ProductImageDTO} from '../../../../../models/DTO/productImageDTO';
import {ActivatedRoute, Router} from '@angular/router';
import {MDBModalService, ToastService} from 'ng-uikit-pro-standard';


@Component({
  selector: 'app-admin-product-images',
  templateUrl: './admin-product-images.component.html',
  styleUrls: ['./admin-product-images.component.css']
})
export class AdminProductImagesComponent implements OnInit {
  @Input() product: Product;
  productImageRoot = environment.s3Bucket;

  productImageDTO: ProductImageDTO;
  productImageDTOArray: ProductImageDTO[] = [];

  myFiles: string [] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private productService: ProductService,
              private modalService: MDBModalService,
              private toast: ToastService) {

  }


  uploadImage() {
  }

  updateImage() {
  }

  ngOnInit(): void {

    let id = 0;
    id = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(id).subscribe((p: Product) => {
        this.product = p;
        this.product.images = p.images.sort((a, b) => a.imageOrder - b.imageOrder);

        p.images.forEach(img => {
          this.productImageDTO = new ProductImageDTO(img.id, img.fileName, img.imageOrder, null);
          console.log('Img id: ' + img.id);
          this.productImageDTOArray.push(this.productImageDTO);
        });
        this.reorderImages();
      },
      (err: any) => console.log('Image fetch error: ' + err)
    );
  }


  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      if ((filesAmount + this.productImageDTOArray.length) > 12) {
        alert(`Maximum number of images per product is 12. \n\n you can add up to ` +
          (12 - this.productImageDTOArray.length) + ` more images.`);
        return false;
      } else {
        for (let i = 0; i < filesAmount; i++) {
          const reader = new FileReader();
          this.myFiles.push(event.target.files[i]);  /*store new files in myFiles array*/

          reader.onload = (ev: any) => {
            this.productImageDTO = new ProductImageDTO(0, ev.target.result, 999, event.target.files[i]);
            this.productImageDTOArray.push(this.productImageDTO);
          };
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }

  }


  submit() {

    const formData = new FormData();
    this.myFiles.forEach(f => formData.append('files', f));
    formData.append('data', new Blob([JSON.stringify(this.productImageDTOArray)], {
      type: 'application/json'
    }));


    this.http.post(environment.apiUrl + '/product/' + this.product.id + '/updateImages', formData)
      .subscribe(res => {
        console.log(res);
        this.toast.success('Updated Successfully.');
        this.router.navigate([this.router.url]);
      });
  }


  onDrop(event: any) {
    moveItemInList(this.productImageDTOArray, event.oldIndex, event.newIndex);
    this.reorderImages();
  }

  reorderImages() {
    for (let i = 0; i < this.productImageDTOArray.length; i++) {
      this.productImageDTOArray[i].order = i;
    }
  }

  deleteImage(img: ProductImageDTO) {
    const index: number = this.productImageDTOArray.indexOf(img);
    if (index !== -1) {
      this.productImageDTOArray.splice(index, 1);
    }
  }
}
