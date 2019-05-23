import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable } from 'rxjs';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { Ticket } from 'src/app/model/project/ticket';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  myControl = new FormControl();
  projects: Observable<Project[]>;
  tickets: Observable<Ticket[]>;

  pivotDate: Date;
  currentDates: Date[];

  constructor(
    private projectService: ProjectService,
    private timesheetService: TimesheetService
    ) {
  }

  ngOnInit() {
    this.projects = this.projectService.projects;
    this.projectService.loadAll();

    this.pivotDate = new Date();
    this.setDates();
  }

  isGroup(index, item): boolean {
    return item.group;
  }

  setDates() {
    this.currentDates = [-6, -5, -4, -3, -2, -1, 0].map(days => {
      const date = new Date();
      date.setDate(this.pivotDate.getDate() + days);
      return date;
    });
  }

  pivotDateIncrease() {
    this.pivotDate.setDate(this.pivotDate.getDate() + 7);
    this.setDates();
  }

  pivotDateDecrease() {
    this.pivotDate.setDate(this.pivotDate.getDate() - 7);
    this.setDates();
  }

}
