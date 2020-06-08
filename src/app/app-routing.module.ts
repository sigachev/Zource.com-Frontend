import {NgModule} from '@angular/core';
import {Router, Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';
import {PageNotFoundComponent} from './components/errors/page-not-found.component';
import {FrontendLayoutComponent} from './layout/frontend-layout.component';
import {AdminLayoutComponent} from './admin/layout/admin-layout.component';
import {UnathorizedComponent} from './components/errors/unathorized/unathorized.component';
import {InternalServerErrorComponent} from './components/errors/internal-server-error/internal-server-error.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN], breadcrumb: 'Admin', title: 'Home'},
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },


  {
    path: '',
    component: FrontendLayoutComponent,
    data: {
      title: 'Home'
    },
    loadChildren: () => import('./layout/frontend.module').then(m => m.FrontendModule)
  },


  /*public error pages.*/
  {path: '**', component: PageNotFoundComponent, data: {breadcrumb: '404 Not Found'}},

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false,
      /*scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 64]*/}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    /*For unkhown pages*/
    /* this.router.errorHandler = (error: any) => {
       this.router.navigate(['/404']);
     };*/
  }
}

