import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Ticket } from 'src/app/model/project/ticket';
import { Project } from 'src/app/model/project/project';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { TicketStatus } from 'src/app/model/project/ticketstatusenum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit, OnDestroy {

  ticketName: FormControl;
  ticketDescription: FormControl;

  project: Project;
  newTicket: Ticket;

  subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewTicketComponent>,
    private ticketService: TicketService) {

    this.ticketName = new FormControl('', [Validators.required, Validators.maxLength(500)]);
    this.ticketDescription = new FormControl('', [Validators.maxLength(500)]);
  }

  ngOnInit() {
    this.newTicket = new Ticket();
    this.project = Object.assign({}, this.data.project);
    this.newTicket.project = this.project.id;
    this.newTicket.name = this.getTicketName(this.project);
    this.newTicket.startdate = new Date();
    this.newTicket.enddate = new Date();
    this.newTicket.status = TicketStatus.Open;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  getTicketName(project: Project): string {
    const existingTicketNames = project.tickets.map(t => t.name);

    let index = 1;
    let name = '';

    while (true) {
      name = project.name.substring(0, 2).toUpperCase() + '-' + this.formatNumberLength((index++), 4);

      if (existingTicketNames.indexOf(name) === -1) {
        return name;
      }
    }
  }

  save() {
    this.subscriptions[0] = this.ticketService.addTicket(this.newTicket).subscribe(ticket => this.dialogRef.close(ticket));
  }

  dismiss() {
    this.dialogRef.close();
  }

  formatNumberLength(num, length) {
    let r = '' + num;
    while (r.length < length) {
        r = '0' + r;
    }
    return r;
}
}
