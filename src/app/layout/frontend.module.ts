import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {HomepageModule} from '../home/homepage.module';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ProfileComponent} from '../components/profile/profile.component';
import {AuthGuard} from '../guards/auth.guard';
import {Role} from '../models/role';
import {BrandsComponent} from '../components/brands/brands.component';
import {BrandDetailsComponent} from '../components/brands/brand-details/brand-details.component';
import {SharedModule} from '../shared/shared.module';
import {UnathorizedComponent} from '../components/errors/unathorized/unathorized.component';
import {PageNotFoundComponent} from '../components/errors/page-not-found.component';
import {CategoryComponent} from '../components/categoty/category.component';
import {CategoryModule} from '../components/categoty/category.module';
import {InternalServerErrorComponent} from '../components/errors/internal-server-error/internal-server-error.component';
import {DirectivesModule} from '../directives/directives.module';
import {AppModule} from '../app.module';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', data: {breadcrumb: 'Log In'}, component: LoginComponent},
  {path: 'register', data: {breadcrumb: 'Sign Up'}, component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {breadcrumb: 'Profile', roles: [Role.USER, Role.ADMIN]}},


  {
    path: 'product',

    data: {
      title: 'Product'
    },
    loadChildren: () => import('../components/product/product.module').then(m => m.ProductModule)

  },

  {path: 'category/:id', component: CategoryComponent},

  {path: 'brands', component: BrandsComponent, data: {breadcrumb: 'Brands'}},
  {
    path: 'brand/:id',
    component: BrandDetailsComponent,
    data: {
      breadcrumb: 'Brand Details'
    }
  },


  {path: '401', component: UnathorizedComponent, data: {breadcrumb: '401 Not Authorized'}},
  {path: '500', component: InternalServerErrorComponent, data: {breadcrumb: '500 Internal Server Error'}},
  {path: '**', component: PageNotFoundComponent, data: {breadcrumb: '404 Not Found'}},


];

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CategoryModule,
    RouterModule.forChild(routes),
    HomepageModule,
    DirectivesModule,
    FormsModule,
    CommonModule
  ],
  exports: [RouterModule],
})
export class FrontendModule {
}
