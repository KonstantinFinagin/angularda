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
import { delay } from 'q';
import { MatDialog } from '@angular/material';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/model/users/user';

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
  tickets: Ticket[];

  pivotDate: Date;

  currentDates: Date[];
  currentTotals: number[];

  subscriptions: Subscription[] = [];

  expandedProjectId: string;
  getTimesheetsSubscription: Subscription;
  getTicketsSubscription: Subscription;

  projectTicketsLoaded: boolean;
  user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private projectService: ProjectService,
    private timesheetService: TimesheetService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.subscriptions[0] = this.authenticationService.currentUser.subscribe(currentUser => {
      this.user = currentUser == null ? null : currentUser.user;
    });

    this.projects = this.projectService.loadAll();
    this.pivotDate = new Date();
    this.setDates();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  isGroup(index, item): boolean {
    return item.group;
  }

  setDates() {

    this.currentDates = [-6, -5, -4, -3, -2, -1, 0].map(days => {
      const date = new Date();
      date.setDate(this.pivotDate.getDate() + days);
      date.setMonth(this.pivotDate.getMonth());
      date.setFullYear(this.pivotDate.getFullYear());
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }

  pivotDateIncrease() {
    const newDate = this.pivotDate.getDate() + 7;
    this.pivotDate.setDate(newDate);
    this.pivotDate.setHours(0, 0, 0, 0);
    this.setDates();
    this.loadTimesheets(this.expandedProjectId);
  }

  pivotDateDecrease() {
    const newDate = this.pivotDate.getDate() - 7;
    this.pivotDate.setDate(newDate);
    this.pivotDate.setHours(0, 0, 0, 0);
    this.setDates();
    this.loadTimesheets(this.expandedProjectId);
  }

  async projectExpanded(projectId: string, isExpanded: boolean) {
    if (!isExpanded) {
      this.tickets = null;
      return;
    }
    await delay(200);
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

    const getTotals = (dates: Date[], tickets: Ticket[]): number[] => {
      const dateTimesheets = (date: Date) => {
        let acc = 0;
        tickets.forEach(ticket => ticket.timesheets.forEach(timesheet => {

          if (timesheet.loggedtime !== 0 && timesheet.date.getTime() === date.getTime()) {
            acc = acc + timesheet.loggedtime;
          }
        }));
        return acc;
      };
      return dates.map(date => dateTimesheets(date));
    };

    this.subscriptions[1] = this.getTicketsSubscription = this.projects
      .pipe(

        map(projects => projects.find(project => project.id === projectId).tickets),

        flatMap(tickets => {
          this.tickets = tickets;
          return this.timesheetService.getTimesheets(projectId);
        }))

      .subscribe(timesheets => {
        this.tickets = this.tickets.map(ticket => mergeTimesheetFunction(ticket, timesheets));
        this.currentTotals = getTotals(this.currentDates, this.tickets);
      });
  }

  editTimesheet(timesheet: Timesheet, index: number) {
    const dialogRef = this.dialog.open(EditTimesheetComponent, {
      width: '450px',
      data: {
        timesheet,
        total: this.currentTotals[index]
      }
    });
  }
}
