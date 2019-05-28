import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/model/project/ticket';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClientHelper } from 'src/app/helpers/http-client-helper';
import { GetTimesheetResponse } from './contracts/gettimesheetresponse';
import { Timesheet } from 'src/app/model/project/timesheet';
import { map } from 'rxjs/operators';
import { PostTimesheetRequest } from './contracts/postimesheetrequest';
import { PutTimesheetRequest } from './contracts/puttimesheetrequest';
import { PostTimesheetResponse } from './contracts/posttimesheetresponse';
import { PutTimesheetResponse } from './contracts/puttimesheetresponse';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private ticketsSubject: BehaviorSubject<Ticket[]>;

  private dataStore: {
    tickets: Ticket[];
  };

  get tickets(): Observable<Ticket[]> {
    return this.ticketsSubject.asObservable();
  }

  constructor(private http: HttpClientHelper) {
    this.dataStore = { tickets: [] };
  }

  getTimesheets(projectId: string): Observable<Timesheet[]> {

    const mapTimesheetFunction = (timesheet: GetTimesheetResponse) => {
      const t: Timesheet = {
        id: timesheet._id,
        comment: timesheet.comment,
        date: new Date(timesheet.date),
        loggedtime: timesheet.logged_time,
        ticketid: timesheet.ticket._id
      };

      t.date.setHours(0, 0, 0, 0);

      return t;
    };

    return this.http
      .get<GetTimesheetResponse[]>(`timesheets/search?projectId=${projectId}`) // getting timesheets with tickets
      .pipe(map(timesheets => timesheets.map(timesheet => mapTimesheetFunction(timesheet))));
  }

  addTimesheet(timesheet: Timesheet): Observable<PostTimesheetResponse> {

    console.log('service: adding timesheet');

    console.log(timesheet);

    const request: PostTimesheetRequest = {
      _id: timesheet.id,
      comment: timesheet.comment,
      date: this.getShortIsoDate(timesheet.date),
      logged_time: timesheet.loggedtime,
      ticket: timesheet.ticketid
    };

    console.log(request);

    return this.http.post<PostTimesheetResponse>('timesheets', request);
  }

  updateTimesheet(timesheet: Timesheet): Observable<string> {

    if (timesheet.id === '') {
      return this.addTimesheet(timesheet).pipe(map(response => response._id));
    }
    console.log('service: updating timesheet');
    console.log(timesheet);

    const request: PutTimesheetRequest = {
      _id: timesheet.id,
      comment: timesheet.comment,
      date: this.getShortIsoDate(timesheet.date),
      logged_time: timesheet.loggedtime,
      ticket: timesheet.ticketid
    };

    console.log(request);

    return this.http.put<PutTimesheetResponse>('timesheets', request).pipe(map(response => response._id));
  }

  private getShortIsoDate(date: Date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
  }
}
