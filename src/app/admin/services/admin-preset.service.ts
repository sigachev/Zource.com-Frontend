import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BrandService} from '../../services/brand.service';
import {ErrorService} from '../../services/error.service';
import {ToastService} from 'ng-uikit-pro-standard';
import {ProductPreset} from '../../models/product-preset';
import {User} from '../../models/user';
import {AuthenticationService} from '../../services/authentication.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPresetService {
  currentUser: User;
  productPreset = ProductPreset;
  pps: ProductPreset[];
  private productPresetUrl = environment.apiUrl + '/product/preset';


  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private brandService: BrandService,
              private errorService: ErrorService,
              private toast: ToastService) {
  }


  private createProductPreset(productPreset: ProductPreset, headers: HttpHeaders): Observable<ProductPreset> {

    // @ts-ignore
    return this.http.post<ProductPreset>(this.productPresetUrl + 'post', productPreset, {headers})
      .pipe(
        tap(data => console.log('createProductPreset: ' + JSON.stringify(data))),
        tap(data => {
          /*this.products.push(data);
          this.changeSelectedProduct(data)*/
          this.toast.success('Updated!');

        }),
        catchError(this.errorService.handleError)
      );
  }


  getProductPreset(id: number): Observable<ProductPreset> {

    return this.http.get<ProductPreset>(this.productPresetUrl + '/' + id)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.errorService.handleError)
      );
  }

  getProductPresetList() {
    let user: User;
    user = this.authService.currentUserValue;
    return this.http.get<ProductPreset[]>(this.productPresetUrl + '/user/' + user.id + '/list')
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.pps = data),
        catchError(this.errorService.handleError)
      );
  }


}
