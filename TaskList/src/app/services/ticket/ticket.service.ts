import { Injectable } from '@angular/core';
import { HttpClientHelper } from 'src/app/helpers/http-client-helper';
import { GetTicketResponse } from './contracts/getticketresponse';
import { PutTicketRequest } from './contracts/putticketrequest';
import { PutTicketResponse } from './contracts/putticketresponse';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Ticket } from 'src/app/model/project/ticket';
import { DateHelper } from 'src/app/helpers/datehelper';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClientHelper) {

  }

  updateTicketStatus(ticket: Ticket): Observable<PutTicketResponse> {
    return this.http.get<GetTicketResponse>(`tasks/${ticket.id}`).pipe(
      mergeMap(getresponse => {
        const putrequest = getresponse as PutTicketRequest;

        console.log(getresponse.status);
        console.log('new status:' + ticket.status);

        putrequest.start_date = DateHelper.getShortIsoDate(ticket.startdate);
        putrequest.end_date = DateHelper.getShortIsoDate(ticket.enddate);

        putrequest.status = ticket.status;
        return this.http.put<PutTicketResponse>(`tasks`, putrequest);
      })
    );
  }
}
