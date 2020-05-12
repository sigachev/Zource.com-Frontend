import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Brand} from '../models/brand';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastService} from 'ng-uikit-pro-standard';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Product} from '../models/product';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brandUrl = environment.apiUrl + '/brand';
  private brandsUrl = environment.apiUrl + '/brands';
  private brands: Brand[];


  constructor(private http: HttpClient,
              private toast: ToastService,
              private errorService: ErrorService) { }


  getBrand(id: number): Observable<Brand> {
    if (id === 0) {
      return of(this.initializeBrand());
    }
    if (this.brands) {
      const foundItem = this.brands.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.brandUrl}/${id}`;

    return this.http.get<Brand>(url)
      .pipe(
        tap(data => console.log('Brand Data: ' + JSON.stringify(data))),
        catchError(this.errorService.handleError)
      );
  }


   getBrands(): Observable<Brand[]> {
     this.toast.show('Begin getBrands() http request ... ');
     if (this.brands) {
       return of(this.brands);
       this.toast.info('Returning thi.brands ');
     }

     return this.http.get<Brand[]>(this.brandsUrl + '/all')
       .pipe(
         tap(data => this.brands = data),
         tap(data => console.log('data from service: ' + JSON.stringify(data))),
         catchError(this.errorService.handleError)
       );
   }



  private initializeBrand(): Brand {
    // Return an initialized object
    return {
      id: 0,
      name: '',
      description: '',
      type: '',
      enabled: true,
    };
  }



}


