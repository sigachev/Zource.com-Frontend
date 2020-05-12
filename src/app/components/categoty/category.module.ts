import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategorySidebarComponent} from './category-sidebar/category-sidebar.component';
import {CategoryTopbarComponent} from './category-topbar/category-topbar.component';
import {AccordionModule, CheckboxModule, RangeModule} from 'ng-uikit-pro-standard';
import {BrandFilterPipe} from '../../pipes/brand-filter.pipe';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';

const routes: Routes = [
/*  {
    path: 'category',
    component: AdminCategoryComponent,
    data: {
      breadcrumb: 'Products Component'
    }
  },*/
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    RangeModule,
    AccordionModule,
    CheckboxModule
  ],
  declarations: [
    CategoryComponent,
    CategorySidebarComponent,
    CategoryTopbarComponent,
    CategoryComponent, BrandFilterPipe
  ],
  providers: [],
  exports: [
    BrandFilterPipe
  ]
})
export class CategoryModule { }
