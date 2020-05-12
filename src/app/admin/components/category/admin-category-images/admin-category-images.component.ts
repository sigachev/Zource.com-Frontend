import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../../../services/upload-file.service';
import {HttpClient} from '@angular/common/http';
import {ToastService} from 'ng-uikit-pro-standard';
import {environment} from '../../../../../environments/environment';
import {CategoryService} from '../../../../services/category.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-category-images',
  templateUrl: './admin-category-images.component.html',
  styleUrls: ['./admin-category-images.component.css']
})
export class AdminCategoryImagesComponent implements OnInit {


  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  file: string;
  id = 0;
  constructor(private uploadService: UploadFileService,
              private categoryService: CategoryService,
              private https: HttpClient,
              private route: ActivatedRoute,
              private toast: ToastService) {}
  viewFile() {
    window.open(environment.s3Bucket + this.file);
  }
  deleteFile() {
    this.https.post<string>('http://localhost:8080/deleteFile', this.file).subscribe(
      res => {
        this.file = res;
      }
    );
  }
  change(event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.categoryService.uploadImage(this.id, this.currentFileUpload).subscribe(event => {
     /* this.toast.success('File Uploaded!');*/
      this.selectedFiles = undefined;
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get('id');
  }


}
