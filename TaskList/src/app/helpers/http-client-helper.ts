import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../app-config/app-config.module';

@Injectable({
  providedIn: 'root'
})
export class HttpClientHelper {

  constructor(
      private http: HttpClient,
      @Inject(APP_CONFIG) private config: AppConfig) {}

  addDefaultHeaders(headers: HttpHeaders) {
    return headers;
  }

  get<T>(shortUrl: string) {
    const apiUrl = this.config.apiUrl + shortUrl;
    let headers = new HttpHeaders();
    headers = this.addDefaultHeaders(headers);

    return this.http.get<T>(apiUrl, { headers });
  }

  post<T>(shortUrl: string, data: any) {
    const apiUrl = this.config.apiUrl + shortUrl;
    let headers = new HttpHeaders();
    headers = this.addDefaultHeaders(headers);

    return this.http.post<T>(apiUrl, data, { headers });
  }
}
