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
import {ActivatedRoute} from '@angular/router';
import {MDBModalService} from 'ng-uikit-pro-standard';


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
              private http: HttpClient,
              private productService: ProductService,
              private modalService: MDBModalService) {

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
          this.myFiles.push(event.target.files[i]);  /*store new file names in myFiles array*/

          reader.onload = (ev: any) => {
            this.productImageDTO = new ProductImageDTO(0, ev.target.result);
            this.productImageDTOArray.push(this.productImageDTO);
          };

          reader.readAsDataURL(event.target.files[i]);
        }
      }
    }

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
          this.productImageDTO = new ProductImageDTO(img.id, this.productImageRoot + img.fileName);
          console.log('Img id: ' + img.id);
          this.productImageDTOArray.push(this.productImageDTO);

        });
      },
      (err: any) => console.log('Image fetch error: ' + err)
    );


  }


  submit() {

    const formData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('files', this.myFiles[i]);
    }

    /*    this.updateForm.patchValue({
          productImageUpdateDTOList: this.productImageDTOArray
        });*/

    formData.append('data', new Blob([JSON.stringify(this.productImageDTOArray)], {
      type: 'application/json'
    }));


    this.http.post(environment.apiUrl + '/product/' + this.product.id + '/updateImages', formData)
      .subscribe(res => {
        console.log(res);
        alert('Updated Successfully.');
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
    console.log('productImageDTOArray : ' + JSON.stringify(this.productImageDTOArray));
  }


  deleteImage(img: ProductImageDTO) {
    const index: number = this.productImageDTOArray.indexOf(img);
    if (index !== -1) {
      this.productImageDTOArray.splice(index, 1);
    }
  }
}
