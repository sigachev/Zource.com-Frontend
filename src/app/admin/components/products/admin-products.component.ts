import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {debounceTime, delay, distinctUntilChanged, tap} from 'rxjs/operators';
import {Category} from '../../../models/category';
import {Brand} from '../../../models/brand';
import {BrandService} from '../../../services/brand.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, AfterViewInit, OnDestroy {

  errorMessage = '';
  products: Product[];
  brands: Brand[];
  brandId = 0;

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  @ViewChildren('#someInput')
  viewChildren!: QueryList<ElementRef>;

  dataTable: any;

  // DataTable options
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();
  displayChild = [false];



  constructor(private productService: ProductService,
              private brandService: BrandService) {
  }


  ngOnInit() {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs: [{
        targets: [0],
        orderable: false,
      }]
    };
    this.renderBrands();
    this.renderDataTable();
  }

  private renderDataTable() {
    this.productService.getProducts().subscribe((products) => {
        this.products = products;
        console.log(JSON.stringify(this.products));
        this.rerender();
      },
      (error: any) => this.errorMessage = error,
    );
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private renderBrands() {
    this.brandService.getBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    },
      (error: any) => this.errorMessage = error,
    );
}


}
