import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavItem} from './nav-item';
import {NavService} from './nav.service.service';

@Component({
  selector: 'admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSidenavComponent {
  navItems: NavItem[] = [
    {
      displayName: 'Admin Dashboard',
      iconName: 'home',
      route: 'admin'},

    {
      displayName: 'Products',
      iconName: 'shop',
      route: 'admin/products',
      children: [
        {
          displayName: 'All Products',
          iconName: '',
          route: 'admin/products',
        },
        {
          displayName: 'Product Presets',
          iconName: '',
          route: 'admin/product/preset/list'
        },
        {
          displayName: 'Product Preset 1',
          iconName: '',
          route: 'admin/product/preset/1'
        }]
    },

    {
      displayName: 'Categories',
      iconName: 'work',
      route: 'admin/categories',
      children: [
        {
          displayName: 'All Categories',
          iconName: '',
          route: 'admin/categories',
        },
        {
          displayName: 'Category Details',
          iconName: '',
          route: 'admin/category/1',
        }]
    },
    {
      displayName: 'Customers',
      iconName: 'account_circle',
      route: 'admin/customers',
      children: [
        {
          displayName: 'List',
          iconName: '',
          route: 'admin/customers',
        }]
    },
    {
      displayName: 'Orders',
      iconName: 'shopping_cart',
      route: 'admin/orders',
      children: [
        {
          displayName: 'Orders List',
          iconName: '',
          route: 'admin/orders',
        }]
    },

  ];



  constructor() { }


}
