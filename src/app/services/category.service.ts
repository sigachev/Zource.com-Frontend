import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ToastService} from 'ng-uikit-pro-standard';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = environment.apiUrl + '/category';
  private categories: Category[];
  private apiUrl = environment.apiUrl;

  private selectedCategorySource = new BehaviorSubject<Category | null>(null);
  selectedCategoryChanges$ = this.selectedCategorySource.asObservable();

  constructor(private http: HttpClient,
              private toast: ToastService,
              private errorService: ErrorService) {
  }

  changeSelectedCategory(selectedCategory: Category | null): void {
    this.selectedCategorySource.next(selectedCategory);
  }

  getCategory(id: number): Observable<Category> {
    if (id === 0) {
      return of(this.initializeCategory());
    }
    if (this.categories) {
      const foundItem = this.categories.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.categoryUrl}/${id}`;

    return this.http.get<Category>(url)
      .pipe(
        tap(data => console.log('Brand Data: ' + JSON.stringify(data))),
        catchError(this.errorService.handleError)
      );
  }


  getChildCategories(category: Category): Observable<Category[]> {
    return this.http.get(this.categoryUrl + '/childCategories')
      .pipe(
      map((data: Category[]) => {
        return data;
      }), catchError( this.errorService.handleError)
      );
  }

  saveCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (category.id === 0) {
      return this.createCategory(category, headers);
    }
    return this.updateCategory(category, headers);
  }


  private createCategory(category: Category, headers: HttpHeaders): Observable<Category> {
    category.id = null;
    // @ts-ignore
    return this.http.post<Category>(this.categoryUrl + '/new', category, {headers})
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        tap(data => {
          this.categories.push(data);
          this.changeSelectedCategory(data);
        }),
        catchError(this.errorService.handleError)
      );
  }

  private updateCategory(category: Category, headers: HttpHeaders): Observable<Category> {
    const url = `${this.categoryUrl}/update/${category.id}`;

    return this.http.put<Category>(url, category, {headers})
      .pipe(
        tap(data => console.log('updatedProduct: ' + category.id)),
        tap(() => this.toast.success('Product updated!')),
        catchError(this.errorService.handleError)
      );
  }

    uploadImage(categoryID: number, file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.apiUrl + '/category/' + categoryID + '/uploadImage', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }



  private initializeCategory(): Category {
  // Return an initialized objectc = new Category();
   const c: Category = new Category();
   c.id = 0;
   return c;
}


}
