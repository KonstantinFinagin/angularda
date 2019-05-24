import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from 'src/app/model/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable, Subscription } from 'rxjs';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { Ticket } from 'src/app/model/project/ticket';
import { FormControl } from '@angular/forms';
import { find, map, flatMap, switchMap } from 'rxjs/operators';
import { Timesheet } from 'src/app/model/project/timesheet';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MainPageComponent implements OnInit, OnDestroy {

  myControl = new FormControl();
  projects: Observable<Project[]>;
  tickets: Ticket[] = [];

  pivotDate: Date;
  currentDates: Date[];
  expandedProjectId: string;
  getTimesheetsSubscription: Subscription;
  getTicketsSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private timesheetService: TimesheetService
  ) {
  }

  ngOnInit() {
    this.projects = this.projectService.loadAll();

    this.pivotDate = new Date();
    this.setDates();
  }

  ngOnDestroy(): void {
    this.getTimesheetsSubscription.unsubscribe();
    this.getTicketsSubscription.unsubscribe();
  }

  isGroup(index, item): boolean {
    return item.group;
  }

  setDates() {
    this.currentDates = [-6, -5, -4, -3, -2, -1, 0].map(days => {
      const date = new Date();
      date.setDate(this.pivotDate.getDate() + days);
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }

  pivotDateIncrease() {
    this.pivotDate.setDate(this.pivotDate.getDate() + 7);
    this.pivotDate.setHours(0, 0, 0, 0);
    this.setDates();
    this.loadTimesheets(this.expandedProjectId);
  }

  pivotDateDecrease() {
    this.pivotDate.setDate(this.pivotDate.getDate() - 7);
    this.pivotDate.setHours(0, 0, 0, 0);
    this.setDates();
    this.loadTimesheets(this.expandedProjectId);
  }

  projectExpanded(projectId: string, isExpanded: boolean) {
    if (!isExpanded) { return; }
    this.expandedProjectId = projectId;
    this.loadTimesheets(this.expandedProjectId);
  }

  loadTimesheets(projectId: string) {

    // get either existing timesheet or new empty one
    const mapTimesheetFromDateFunction = (date: Date, ticketid: string, timesheets: Timesheet[]) => {
      const thisDateTimesheet = timesheets.find(ts => ts.ticketid === ticketid && date.getTime() === ts.date.getTime());

      const emptyTimesheet: Timesheet = {
        ticketid,
        comment: '',
        date,
        id: '',
        loggedtime: 0
      };
      return thisDateTimesheet !== undefined ? thisDateTimesheet : emptyTimesheet;
    };

    // fill existing timesheets
    const mergeTimesheetFunction = (t: Ticket, timesheets: Timesheet[]) => {
      t.timesheets = this.currentDates.map(date => mapTimesheetFromDateFunction(date, t.id, timesheets));
      return t;
    };

    this.getTicketsSubscription = this.projects
      .pipe(

        // getting tickets
        map(projects => projects.find(project => project.id === projectId).tickets),

        // chaining api calls with flatMap
        flatMap(tickets => {
          this.tickets = tickets;
          console.log(tickets);
          return this.timesheetService.getTimesheets(projectId);
        }))

      .subscribe(timesheets => {
        console.log(timesheets);
        this.tickets = this.tickets.map(ticket => mergeTimesheetFunction(ticket, timesheets));
      });
  }
}
