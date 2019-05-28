import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../../helpers/http-client-helper';
import { GetProjectResponse } from './contracts/getprojectresponse';
import { map, tap } from 'rxjs/operators';
import { Project } from 'src/app/model/project/project';
import { Observable, BehaviorSubject } from 'rxjs';
import { TimesheetService } from '../timesheet/timesheet.service';
import { GetProjectTicketResponse } from './contracts/getprojectticketresponse';
import { Ticket } from 'src/app/model/project/ticket';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Observable<Project[]>;

  constructor(
    private http: HttpClientHelper
    ) {
  }

  loadAll(): Observable<Project[]> {

    const mapTicketFunction = (r: GetProjectTicketResponse) => {
      const t: Ticket = {
        id: r._id,
        name: r.name,
        status: r.status,
        project: r.project,
        timesheets: []
      };
      return t;
    };

    const mapProjectFunction = (r: GetProjectResponse) => {
      const p: Project = {
        id: r._id,
        description: r.description,
        name: r.name,
        tickets: r.tickets.map(t => mapTicketFunction(t))
      };
      return p;
    };

    return this.http.get<GetProjectResponse[]>('projects').pipe(
      map(projects => projects.map(mapProjectFunction)));
  }
}

