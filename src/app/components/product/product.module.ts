import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductService} from '../../services/product.service';
import {ProductResolverService} from '../../services/product-resolver.service';
import {SharedModule} from '../../shared/shared.module';
import {CardsModule, CarouselModule, CheckboxModule, LightBoxModule} from 'ng-uikit-pro-standard';
import { ProductImageGalleryComponent } from './product-detail/product-image-gallery/product-image-gallery.component';
import {NgxGalleryModule} from 'ngx-gallery-9';

const routes: Routes = [
  {
    path: ':id', pathMatch: 'full',
    resolve: {resolvedData: ProductResolverService},
    component: ProductDetailComponent,
    data: {
      title: 'Product title',
      breadcrumb: 'Product Details'
    }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    CheckboxModule,
    CardsModule,
    LightBoxModule,
    NgxGalleryModule,
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    ProductDetailComponent,
    ProductImageGalleryComponent
  ],
  providers: [
    ProductService,
    ProductResolverService
  ]
})
export class ProductModule {
}
