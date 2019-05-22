import { Injectable } from '@angular/core';
import { HttpClientHelper } from '../../helpers/http-client-helper';
import { GetProjectResponse } from './contracts/getprojectresponse';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/model/project/project';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsSubject: BehaviorSubject<Project[]>;

  private dataStore: {
    projects: Project[]
  };

  constructor(private http: HttpClientHelper) {
    this.dataStore = { projects: [] };
    this.projectsSubject = new BehaviorSubject<Project[]>([]);
  }

  get projects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  loadAll() {

    const mapFunction = (r: GetProjectResponse) => {
      const p: Project = {
        _id: r._id,
        description: r.description,
        name: r.name
      };
      return p;
    };

    return this.http.get<GetProjectResponse[]>('projects')
      .subscribe(
        data => {
          this.dataStore.projects = data.map(r => mapFunction(r));
          this.projectsSubject.next(Object.assign({}, this.dataStore).projects);
        },
        error => {
          console.log('Failed to fetch projects');
        });
  }
}

