import { Injectable } from '@angular/core';
import { HttpClientHelper } from 'src/app/helpers/http-client-helper';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClientHelper) {

  }

  
}
