import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../../helpers/http-client-helper';
import { GetProjectResponse } from './contracts/getprojectresponse';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/model/project/project';
import { Observable, BehaviorSubject } from 'rxjs';
import { TimesheetService } from '../timesheet/timesheet.service';
import { GetProjectTicketResponse } from './contracts/getprojectticketresponse';
import { Ticket } from 'src/app/model/project/ticket';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsSubject: BehaviorSubject<Project[]>;

  private dataStore: {
    projects: Project[]
  };

  constructor(
    private http: HttpClientHelper,
    private timesheetService: TimesheetService
    ) {
    this.dataStore = { projects: [] };
    this.projectsSubject = new BehaviorSubject<Project[]>([]);
  }

  get projects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  loadAll() {

    const mapTicketFunction = (r: GetProjectTicketResponse) => {
      const t: Ticket = {
        _id: r._id,
        name: r.name,
        status: r.status,
        project: r.project,
        timesheets: []
      };
      return t;
    };

    const mapProjectFunction = (r: GetProjectResponse) => {
      const p: Project = {
        _id: r._id,
        description: r.description,
        name: r.name,
        tickets: r.tickets.map(t => mapTicketFunction(t))
      };
      return p;
    };

    return this.http.get<GetProjectResponse[]>('projects')
      .subscribe(
        data => {
          this.dataStore.projects = data.map(r => mapProjectFunction(r));
          this.projectsSubject.next(Object.assign({}, this.dataStore).projects);
        },
        error => {
          console.log('Failed to fetch projects');
        });
  }
}

