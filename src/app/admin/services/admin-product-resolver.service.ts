import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductResolved} from '../../models/product';
import {ProductService} from '../../services/product.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Brand} from '../../models/brand';
import {BrandService} from '../../services/brand.service';

@Injectable()
export class AdminProductResolverService implements Resolve<Brand[]> {

  constructor(private brandService: BrandService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Brand[]> {

    return this.brandService.getBrands()
      .pipe(
        map(brands => {
          console.log('Brands list from resolver: ' + JSON.stringify(brands));
          return brands;
        }),
        catchError(error => {
          const message = 'Retrieval error: ' + error;
          console.log(message);
          return of([]);
        })
      );

  }

}
