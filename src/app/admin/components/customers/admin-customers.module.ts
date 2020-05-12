import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminCustomersComponent} from './admin-customers.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

const routes: Routes = [

  {path: 'customers', pathMatch: 'full', component: AdminCustomersComponent},
  {
    path: 'customer/:id',
    component: AdminCustomersComponent,
    data: {
      breadcrumb: 'Customer Details'
    }
  }
];

@NgModule({
  declarations: [AdminCustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class AdminCustomersModule { }
