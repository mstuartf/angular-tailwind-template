import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { delay, tap } from 'rxjs/operators';

// type the requestOptions to make sure HttpClient uses the right methods
// (see https://stackoverflow.com/a/48405006)
interface requestOptions {
  headers?: HttpHeaders | {[header: string]: string | string[]},
  observe?: 'body',
  params?: HttpParams | {[param: string]: string | string[]},
  reportProgress?: boolean,
  responseType?: 'json',
  withCredentials?: boolean,
}

@Injectable()
export class ApiService {

  delay: number = 0;

  constructor(public http: HttpClient) {}

  get<T>(endpoint: string, params?: object, reqOpts?: requestOptions): Observable<T> {

    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams()
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k])
      }
    }

    return this.http.get<T>(endpoint, reqOpts).pipe(delay(this.delay));
    
  }

  post<T>(endpoint: string, body: any, reqOpts?: requestOptions): Observable<T> {
    return this.http.post<T>(endpoint, body, reqOpts).pipe(delay(this.delay));
  }

  put<T>(endpoint: string, body: any, reqOpts?: requestOptions): Observable<T> {
    return this.http.put<T>(endpoint, body, reqOpts).pipe(delay(this.delay));
  }

  delete<T>(endpoint: string, reqOpts?: requestOptions): Observable<T> {
    return this.http.delete<T>(endpoint, reqOpts).pipe(delay(this.delay));
  }

  patch<T>(endpoint: string, body: any, reqOpts?: requestOptions): Observable<T> {
    return this.http.patch<T>(endpoint, body, reqOpts).pipe(delay(this.delay));
  }

}
