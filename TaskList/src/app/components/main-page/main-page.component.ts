import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable } from 'rxjs';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';

export interface DateList {}

export interface Ticket {
  _id: string;
  hours: number;
  comment: string;
}

export interface TicketTimesheet {
  name: string;
  day1: Ticket;
  day2: Ticket;
  day3: Ticket;
  day4: Ticket;
  day5: Ticket;
}

export interface ProjectGroup {
  name: string;
}

const ELEMENT_DATA: (TicketTimesheet | ProjectGroup)[] = [
  {name: 'Project 1'},
  {name: 'Ticket1',
    day1: { _id: '', hours: 4, comment: ''},
    day2: { _id: '', hours: 4, comment: ''},
    day3: { _id: '', hours: 4, comment: ''},
    day4: { _id: '', hours: 4, comment: ''},
    day5: { _id: '', hours: 4, comment: ''},
  },
  {name: 'Ticket2',
    day1: { _id: '', hours: 4, comment: ''},
    day2: { _id: '', hours: 4, comment: ''},
    day3: { _id: '', hours: 4, comment: ''},
    day4: { _id: '', hours: 4, comment: ''},
    day5: { _id: '', hours: 4, comment: ''},
  },
  {name: 'Project 2'},
  {name: 'Ticket1',
    day1: { _id: '', hours: 4, comment: ''},
    day2: { _id: '', hours: 4, comment: ''},
    day3: { _id: '', hours: 4, comment: ''},
    day4: { _id: '', hours: 4, comment: ''},
    day5: { _id: '', hours: 4, comment: ''},
  },
  {name: 'Ticket2',
    day1: { _id: '', hours: 4, comment: ''},
    day2: { _id: '', hours: 4, comment: ''},
    day3: { _id: '', hours: 4, comment: ''},
    day4: { _id: '', hours: 4, comment: ''},
    day5: { _id: '', hours: 4, comment: ''},
  },
];

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  dataSource = ELEMENT_DATA;

  projects: Observable<Project[]>;
  tickets: Observable<Ticket[]>;

  displayedColumns: string[] = ['name', 'backward', 'day1', 'day2', 'day3', 'day4', 'day5', 'forward'];

  constructor(
    private projectService: ProjectService,
    private timesheetService: TimesheetService
    ) {
  }

  ngOnInit() {
    this.projects = this.projectService.projects;
    this.projectService.loadAll();
  }

  isGroup(index, item): boolean {
    return item.group;
  }
}
