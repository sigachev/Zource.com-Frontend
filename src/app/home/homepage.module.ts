import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainSliderComponent} from './main-slider/main-slider.component';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home.component';
import {FeaturedProductsComponent} from './featured-products/featured-products.component';
import { CategoriesGridComponent } from './categories-grid/categories-grid.component';
import { TopCategoriesComponent } from './top-categories/top-categories.component';
import {CarouselModule} from 'ng-uikit-pro-standard';


@NgModule({
  declarations: [
    HomeComponent,
    MainSliderComponent,
    FeaturedProductsComponent,
    CategoriesGridComponent,
    TopCategoriesComponent,

  ],
    imports: [SharedModule,
        CommonModule, CarouselModule,
    ],
  exports: [
    CommonModule,
    MainSliderComponent
  ]
})
export class HomepageModule {
}
