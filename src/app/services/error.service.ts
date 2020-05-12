import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {ToastService} from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  message: '';

  constructor() {
  }

  public handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, message: ${err.message},  body was: ${err.error}`;
    }
    console.error('Error service: ' + errorMessage);

    return throwError(err);
  }

  /*
    handleError(err) {
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
        // client-side error
        console.log('Client Side Error');
        errorMessage = `Error: ${err.message}`;
      } else if (err.error instanceof ApiError) {
        // ApiError
        console.log('Api Error');
        errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
      } else if (err.error instanceof HttpErrorResponse) {
        // HttpErrorResponse
        console.log('HttpErrorResponse Error');
        errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
      } else {
        // server-side error
        console.log('Server Side Error');
        errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
      console.log(errorMessage);
      return throwError(err);
    }
  */


}
