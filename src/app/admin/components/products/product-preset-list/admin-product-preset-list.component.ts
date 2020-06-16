import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../../../models/product';
import {ProductPreset} from '../../../../models/product-preset';
import {AdminPresetService} from '../../../services/admin-preset.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-admin-product-preset-list',
  templateUrl: './admin-product-preset-list.component.html',
  styleUrls: ['./admin-product-preset-list.component.css']
})
export class AdminProductPresetListComponent implements OnInit, AfterViewInit, OnDestroy {
  presets: ProductPreset[];
  /*  dataSource: MatTableDataSource<ProductPreset>;
    displayedColumns = ['id', 'sku', 'name', 'price', 'description', 'status'];
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;*/

  /*  @ViewChild('input', {static: false}) input: ElementRef;*/
  private errorMessage = '';
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


  constructor(private productPresetService: AdminPresetService
  ) {
  }

  ngOnInit(): void {

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 2,
      columnDefs: [{
        targets: [0, 1],
        orderable: false,
      }]
    };
    this.RenderDataTable();


  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }


  private RenderDataTable() {
    this.productPresetService.getProductPresetList().subscribe((pps) => {
        this.presets = pps;
        /*       this.dataSource = new MatTableDataSource<ProductPreset>();
               this.dataSource.data = this.presets;
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort;*/
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  displayTR(i) {
    this.displayChild[i] = !this.displayChild[i];


  /*  this.rerender();*/
  }
}
