import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DetailComponent} from './components/detail/detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {HomepageModule} from './home/homepage.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModulesPro, ToastModule} from 'ng-uikit-pro-standard';
import {ProductService} from './services/product.service';
import {BrandService} from './services/brand.service';
import {AdminModule} from './admin/admin.module';
import {OnlyIntegerDirective} from './directives/only-integer.directive';
import {OnlyNumberDirective} from './directives/only-number.directive';
import {FrontendLayoutComponent} from './layout/frontend-layout.component';
import {AdminLayoutComponent} from './admin/layout/admin-layout.component';
import {FrontendModule} from './layout/frontend.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {ErrorInterceptor} from './config/interceptors/error.interceptor';
import {JwtInterceptor} from './config/interceptors/jwt.interceptor';
import { InternalServerErrorComponent } from './components/errors/internal-server-error/internal-server-error.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    OnlyIntegerDirective,
    OnlyNumberDirective,
    FrontendLayoutComponent,
    AdminLayoutComponent,
    InternalServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModulesPro.forRoot(),
    /* HttpClientInMemoryWebApiModule.forRoot(ProductData),*/
    /* import ng-zorro-antd root module，you should import NgZorroAntdModule and avoid importing sub modules directly */

    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    HomepageModule,
    ToastModule.forRoot(),
    AdminModule,
    FrontendModule
  ],
  providers: [
   /* {provide: NZ_I18N, useValue: en_US},*/
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ProductService, BrandService
  ],
  bootstrap: [AppComponent],
  exports: [],
  schemas: []
})
export class AppModule {
}
