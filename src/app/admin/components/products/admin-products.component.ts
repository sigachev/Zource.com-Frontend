import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product';
import {debounceTime, delay, distinctUntilChanged, tap} from 'rxjs/operators';
import {Category} from '../../../models/category';
import {Brand} from '../../../models/brand';
import {BrandService} from '../../../services/brand.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, AfterViewInit {

  category: Category = new Category();
  products: Product[];
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['id', 'sku', 'name', 'price', 'description', 'brand', 'enabled'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;
  private errorMessage = '';
  public loading = false;
  brands: Brand[];
  brandId = 0;
  name = '';


  constructor(private productService: ProductService,
              private brandService: BrandService) {
  }


  ngOnInit() {
    this.RenderDataTable();
    this.renderBrands();
  }

  ngAfterViewInit() {
  }



  private RenderDataTable() {
    this.productService.getProducts().subscribe((ps) => {
        this.products = ps;
        this.dataSource = new MatTableDataSource<Product>();
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(JSON.stringify(this.products));
      },
      (error: any) => this.errorMessage = error,
    );
  }


  private filterByBrand(brandId: number) {
    this.productService.findProducts(0, brandId, this.name).subscribe((ps) => {
        this.products = ps;
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(JSON.stringify(this.products));
      },
      (error: any) => this.errorMessage = error,
    );
  }

  private renderBrands() {
    this.brandService.getBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    },
      (error: any) => this.errorMessage = error,
    );
}

  applyFilter(filterValue: any) {
    this.loading = true;
    setTimeout(() => {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
      },
      100);
    this.loading = false;
  }


  action() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  brandFilterChanged(value: any) {
    console.log(value);
    this.filterByBrand(value);
  }

  clearSearch() {
    this.name = '';
    this.applyFilter(this.name);
  }
}
