import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private apiUrl = environment.apiUrl;

  constructor(private https: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.apiUrl + '/uploadFile', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }


  pushProductImageToStorage(file: File, id: number): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.apiUrl + '/product/' + id + '/uploadFile', data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.https.request(newRequest);
  }


}
