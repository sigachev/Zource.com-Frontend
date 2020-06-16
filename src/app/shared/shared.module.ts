import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {BreadcrumbComponent} from '../layout/breadcrumb/breadcrumb.component';
import {TruncateTextPipe} from '../pipes/truncate-text.pipe';
import {UomNameFormatPipe} from '../pipes/uom-name-format.pipe';
import {LoginComponent} from '../components/login/login.component';
import {ProfileComponent} from '../components/profile/profile.component';
import {BrandsComponent} from '../components/brands/brands.component';
import {CardsModule, ToastModule, ToastService} from 'ng-uikit-pro-standard';
import {BrandDetailsComponent} from '../components/brands/brand-details/brand-details.component';
import {UnathorizedComponent} from '../components/errors/unathorized/unathorized.component';
import {PageNotFoundComponent} from '../components/errors/page-not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    TruncateTextPipe,
    UomNameFormatPipe,
    LoginComponent,
    ProfileComponent,
    BrandsComponent,
    BrandDetailsComponent,
    UnathorizedComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardsModule
  ],

  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    TruncateTextPipe,
    UomNameFormatPipe,
  ],
})
export class SharedModule { }
