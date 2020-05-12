import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Product, ProductResolved} from '../models/product';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {ProductService} from './product.service';
import {ApiError} from '../models/errors/ApiError';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from './error.service';

@Injectable()
export class ProductResolverService implements Resolve<ProductResolved> {

  message = '';

  constructor(private productService: ProductService,
              private errorService: ErrorService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');

    if (isNaN(+id) || (+id === 0)) {
      this.message = 'Product Id is not a valid number: ' + id.toString();
      console.error(this.message);
      return of({product: null, error: this.message});
    } else {
      return this.productService.getProduct(+id)
        .pipe(
          map(prod => {
            return ({product: prod, error: this.message});
          }),
          catchError((err: any) => {
            return of({product: null, error: err.error.message});
          })
        );
    }
  }




}
