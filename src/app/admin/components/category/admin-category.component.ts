import {Component, OnInit} from '@angular/core';
import {Brand} from '../../../models/brand';
import {Category} from '../../../models/category';
import {ToastService} from 'ng-uikit-pro-standard';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  id = 0;
  category: Category;
  categoryForm: any;
  errorMessage = '';

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService,
              private fb: FormBuilder) {

    this.categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])]
  });
}


ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.categoryService.getCategory(this.id).subscribe(
      (c: Category) => {
        this.category = c;
        this.categoryForm.patchValue({
          name: this.category.name,
          description: this.category.description,
          }
        );
        console.log(this.category);
      },
      (error: any) => {
        this.toast.error(error);
      }
    );
  }


saveCategory(values) {

    console.log(values);
    console.log('Category: ' + JSON.stringify(this.category));

    this.category.name = values.name;
    this.category.description = values.description;

    this.categoryService.saveCategory(this.category).subscribe(result => {
        this.router.navigate(['admin/category/' + this.category.id]);
        this.toast.success('Category saved!');
      },
      (err: any) => this.errorMessage = err,
    );
  }

}
