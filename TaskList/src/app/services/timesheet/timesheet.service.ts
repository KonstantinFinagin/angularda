import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/model/project/ticket';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClientHelper } from 'src/app/helpers/http-client-helper';
import { GetTimesheetResponse } from './contracts/gettimesheetresponse';
import { Timesheet } from 'src/app/model/project/timesheet';
import { map } from 'rxjs/operators';

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

  addTimesheet(timesheetId: string, timesheet: Timesheet) {
    // TODO
  }

  editTimesheet(timesheetId: string, timesheet: Timesheet) {

  }
}
