import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminHomeComponent} from './components/home/admin-home.component';
import {AdminHeaderComponent} from './layout/header/admin-header.component';
import {AdminFooterComponent} from './layout/footer/admin-footer.component';
import {AccordionModule, CheckboxModule, IconsModule, InputsModule, SelectModule, SidenavModule, TabsModule} from 'ng-uikit-pro-standard';
import {AdminSidenavComponent} from './layout/sidenav/admin-sidenav.component';
import {AdminProductsComponent} from './components/products/admin-products.component';
import {CategoryModule} from '../components/categoty/category.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminProductComponent} from './components/products/product/admin-product.component';
import {AdminProductImagesComponent} from './components/products/product/admin-product-images/admin-product-images.component';
import {AdminCategoryComponent} from './components/category/admin-category.component';
import {AdminCategoryImagesComponent} from './components/category/admin-category-images/admin-category-images.component';

import {MenuListItemComponent} from './layout/sidenav/menu-list-item/menu-list-item.component';
import {NavService} from './layout/sidenav/nav.service.service';
import {UserService} from '../services/user.service';
import {AdminCustomersModule} from './components/customers/admin-customers.module';

import {UnathorizedComponent} from '../components/errors/unathorized/unathorized.component';
import {PageNotFoundComponent} from '../components/errors/page-not-found.component';
import {SharedModule} from '../shared/shared.module';

import {AdminProductResolverService} from './services/admin-product-resolver.service';
import {MdbSortableModule} from 'mdb-sortable';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {InternalServerErrorComponent} from '../components/errors/internal-server-error/internal-server-error.component';
import {AdminProductPresetComponent} from './components/products/product-preset/admin-product-preset.component';
import {AdminProfileComponent} from './components/profile/admin-profile.component';
import {AdminProductPresetListComponent} from './components/products/product-preset-list/admin-product-preset-list.component';
import {DataTablesModule} from 'angular-datatables';
import { PresetChildDirective } from './components/products/product-preset-list/preset-child.directive';
import {TableModule} from 'primeng';
import { AdminNewProductComponent } from './components/products/product/admin-new-product/admin-new-product.component';


const routes: Routes = [

  {path: '', pathMatch: 'full', component: AdminHomeComponent},
  {path: 'products', pathMatch: 'full', component: AdminProductsComponent},
  {
    path: 'category/:id',
    component: AdminCategoryComponent,
    data: {
      breadcrumb: 'Category Details'
    }
  },
  {
    path: 'product/preset/list',
    component: AdminProductPresetListComponent,
    data: {
      breadcrumb: 'Product presets'
    }
  },
  {
    path: 'product/preset/:id',
    resolve: {resolvedBrandsList: AdminProductResolverService},
    component: AdminProductPresetComponent,
    data: {
      breadcrumb: 'Settings for new product'
    }
  },
  {
    path: 'product/new',
    resolve: {resolvedBrandsList: AdminProductResolverService},
    component: AdminNewProductComponent,
    data: {
      breadcrumb: 'New Product'
    }
  },
  {
    path: 'product/:id',
    resolve: {resolvedBrandsList: AdminProductResolverService},
    component: AdminProductComponent,
    data: {
      breadcrumb: 'Product Details'
    }
  },
  {
    path: 'profile',
    component: AdminProfileComponent,
    data: {
      breadcrumb: 'Profile'
    }
  },

  {
    path: '',
    data: {
      breadcrumb: 'Product Details',
      title: '',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./components/customers/admin-customers.module').then(m => m.AdminCustomersModule)
      }
    ]
  },


  {path: '401', component: UnathorizedComponent, data: {breadcrumb: '401 Not Authorized'}},
  {path: '500', component: InternalServerErrorComponent, data: {breadcrumb: '500 Internal Server Error'}},
  {path: '**', component: PageNotFoundComponent, data: {breadcrumb: '404 Not Found'}},
];

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidenavComponent,
    AdminProductsComponent,
    AdminProductComponent,
    AdminProductImagesComponent,
    AdminCategoryComponent,
    AdminCategoryImagesComponent,
    MenuListItemComponent,
    AdminProductPresetComponent,
    AdminProfileComponent,
    AdminProductPresetListComponent,
    PresetChildDirective,
    AdminNewProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SidenavModule,
    IconsModule,
    AccordionModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    CategoryModule,
    CheckboxModule,
    SelectModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    AdminCustomersModule,
    InputsModule,
    MdbSortableModule,
    DataTablesModule,
    TableModule
  ],
  exports: [
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidenavComponent,
    AdminCategoryComponent,
    RouterModule,
  ],
  providers: [NavService, UserService, AdminProductResolverService]
})
export class AdminModule {
}
