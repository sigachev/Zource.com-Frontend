import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {catchError, delay, map, mergeMap, tap} from 'rxjs/operators';
import {Product} from '../models/product';
import {BehaviorSubject, forkJoin, from, Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {ToastService} from 'ng-uikit-pro-standard';
import {BrandService} from './brand.service';
import {Brand} from '../models/brand';
import {ProductImage} from '../models/product-image';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {ProductDTO} from '../models/DTO/productDTO';
import {ErrorService} from './error.service';


@Injectable()
export class ProductService {
  private productUrl = environment.apiUrl + '/product';
  private productsUrl = environment.apiUrl + '/products';
  private brandUrl = environment.apiUrl + '/brand';

  private products: Product[];
  private productObservable: Observable<Product>;
  private product: Product;
  private productDTO: ProductDTO;

  private selectedProductSource = new BehaviorSubject<Product | null>(null);
  selectedProductChanges$ = this.selectedProductSource.asObservable();
  public productImageRoot = environment.s3Bucket;

  constructor(private http: HttpClient,
              private brandService: BrandService,
              private errorService: ErrorService,
              private toast: ToastService) {
  }

  changeSelectedProduct(selectedProduct: Product | null): void {
    this.selectedProductSource.next(selectedProduct);
  }

  getProducts(): Observable<Product[]> {
    this.toast.info('Begin ... ');
    if (this.products) {
      return of(this.products);
      this.toast.info('Return ');
    }
    // @ts-ignore
    return this.http.get<Product[]>(this.productsUrl + '/all')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.products = data),
        catchError(this.errorService.handleError)
      );
  }

  findProducts(categoryId = 0, brandId = 0, filterName = '', sortOrder = 'asc'): Observable<Product[]> {

    const params = new HttpParams();

    return this.http.get(this.productsUrl, {
      params: new HttpParams()
        .set('categoryId', (!!categoryId && isNaN(categoryId) ? categoryId.toString() : ' '))
        .set('brandId', brandId.toString())
        .set('name', filterName)
    }).pipe(delay(200),
      map((data: Product[]) => {
        return data;
      }), catchError(error => {
        return throwError('Products not found!');
      })
    );
  }


  getProductImages(id: number): Observable<ProductImage[]> {
    const url = `${this.productUrl}/${id}`;

    return this.http.get<ProductImage[]>(url + '/images').pipe(
      map(images => {
        this.product.images = images;
        return images;
      }),
      tap(data => console.log('Product Data: ' + JSON.stringify(data))),
      catchError(this.errorService.handleError),
    );
  }


  /*getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
/!*    if (this.products) {
      const foundItem = this.products.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }*!/
    const url = `${this.productUrl}/${id}`;

    return this.http.get<Product>(url)
      .pipe(
        map(product => {
            if (product) {
              this.http.get<Brand>(this.brandUrl + '/' + product.brand).subscribe(brand => product.brand = brand);
            /!*  this.getProductImages(product.id);*!/
            }
            this.product = product;
            return product;
          }
        ),
        tap(data => console.log('Product Data1: ' + JSON.stringify(this.product))),
        catchError(this.errorService.handleError),
        catchError(e => throwError(e) ),
      );
  }*/


  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    /*    if (this.products) {
          const foundItem = this.products.find(item => item.id === id);
          if (foundItem) {
            return of(foundItem);
          }
        }*/
    const url = `${this.productUrl}/${id}`;

    return this.http.get<Product>(url)
      .pipe(
        map(product => {
            if (product) {
              this.http.get<Brand>(this.brandUrl + '/' + product.brand).subscribe(brand => product.brand = brand);
              /*  this.getProductImages(product.id);*/
            }
            this.product = product;
            return product;
          }
        ),
        tap(data => console.log('Product Data1: ' + JSON.stringify(this.product))),
        catchError(this.errorService.handleError),
        catchError(e => throwError(e)),
      );
  }


  saveProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (product.id === 0) {
      return this.createProduct(product, headers);
    }
    return this.updateProduct(product, headers);
  }

  /*  deleteProduct(id: number): Observable<Product> {
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const url = `${this.productUrl}/${id}`;
      // @ts-ignore
      return this.http.delete<Product>(url, {headers})
        .pipe(
          tap(data => console.log('deleteProduct: ' + id)),
          tap(data => {
            const foundIndex = this.products.findIndex(item => item.id === id);
            if (foundIndex > -1) {
              this.products.splice(foundIndex, 1);
              this.changeSelectedProduct(null);
            }
          }),
          catchError(this.handleError)
        );
    }*/

  private createProduct(product: Product, headers: HttpHeaders): Observable<Product> {
    product.id = null;
    // @ts-ignore
    return this.http.post<Product>(this.productsUrl + '/new', product, {headers})
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        tap(data => {
          this.products.push(data);
          this.changeSelectedProduct(data);
        }),
        catchError(this.errorService.handleError)
      );
  }

  private updateProduct(product: Product, headers: HttpHeaders): Observable<Product> {
    const url = `${this.productUrl}/update`;
    this.productDTO = new ProductDTO(product);

    console.log('ProductDTO before update: ' + JSON.stringify(this.productDTO));
    console.log('Url: ' + url);

    return this.http.put<Product>(url, this.productDTO, {headers})
      .pipe(
        tap(data => console.log('updatedProduct: ' + product.id)),
        tap(() => this.toast.success('Product updated!')),
        catchError(this.errorService.handleError)
      );
  }


  private initializeProduct(): Product {
    // Return an initialized object
    return {
      priceFor: undefined, soldBy: undefined, uomRatio: 0,
      id: 0,
      name: '',
      sku: '',
      images: undefined,
      brand: undefined,
      /*      category: '',*/
      createDate: '',
      price: 0,
      description: '',
      /* starRating: 0,*/
      /*imageUrl: '',*/
      enabled: true
      /* tags: ['A', 'B']*/
    };
  }

}
