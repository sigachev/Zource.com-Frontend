import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Brand} from '../../../models/brand';
import {BrandService} from '../../../services/brand.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {Product} from '../../../models/product';


@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {


  constructor(private brandService: BrandService, private toast: ToastService) {
  }



  @Output() nameFilterChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() priceRangeFilterChange: EventEmitter<{ first: number, second: number }> = new EventEmitter();

  /*  @Input('filterElement') filterElementRef: ElementRef;*/

  @Input('priceInput') priceSlider: ElementRef;



  brands: Brand[];
  private brandFilter: any;
  private errorMessage = '';
  private _priceRange = {first: 0, second: 100};
  private _nameFilter;
  searchBrandText = '';

  get nameFilter(): string {
    return this._nameFilter;
  }

  set nameFilter(value: string) {
    this._nameFilter = value;
    this.nameFilterChange.emit(value);
  }

  get priceRange(): { first: number; second: number } {
    return this._priceRange;
  }

  set priceRange(value: { first: number; second: number }) {
    this._priceRange = value;
  }







  onRangeValueChange($event: any) {
    this.priceRangeFilterChange.emit($event);

    console.log(JSON.stringify($event));
  }


  onAnimationStateChange(state: any) {
    console.log(state);
  }


  ngOnInit() {
    this.brandService.getBrands().subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
        console.log(JSON.stringify(this.brands));
      },
      (error: any) => this.errorMessage = error
    );
  }


}
