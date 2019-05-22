import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  projects: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projects = this.projectService.projects;
    this.projectService.loadAll();
  }
}
