import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {Content} from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private contentType: string;
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;

    if (request.headers.has('Content-Type')) {
      this.contentType = request.headers.get('Content-Type');
    }

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`,
        }
      });
    }

    return next.handle(request);
  }
}
