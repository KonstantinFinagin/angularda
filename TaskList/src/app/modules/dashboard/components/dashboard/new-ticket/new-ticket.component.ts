import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Ticket } from 'src/app/model/project/ticket';
import { Project } from 'src/app/model/project/project';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { TicketStatus } from 'src/app/model/project/ticketstatusenum';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  ticketName: FormControl;
  ticketDescription: FormControl;

  project: Project;
  newTicket: Ticket;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewTicketComponent>,
    private ticketService: TicketService) {
  }

  ngOnInit() {
    this.newTicket = new Ticket();
    this.project = {...this.data.project};
    this.newTicket.project = this.project.id;
    this.newTicket.name = this.getTicketName(this.project);
    this.newTicket.startdate = new Date();
    this.newTicket.enddate = new Date();
    this.newTicket.status = TicketStatus.Open;

    this.ticketName = new FormControl(this.newTicket.name, [Validators.required, Validators.maxLength(500)]);
    this.ticketDescription = new FormControl(this.newTicket.description, [Validators.maxLength(500)]);

    this.form = this.fb.group({
      ticketName: this.ticketName,
      ticketDescription: this.ticketDescription
    });
  }

  getTicketName(project: Project): string {
    const existingTicketNames = project.tickets.map(t => t.name);

    existingTicketNames.sort();

    const indexes = existingTicketNames.map(name => parseInt(name.substring(3), 10));

    const newIndex = this.formatNumberLength(Math.max(...indexes) + 1, 4) ;
    const projectLiteral = project.name.substring(0, 2).toUpperCase();

    return `${projectLiteral}-${newIndex}`;
  }

  save() {
    this.newTicket.name = this.form.value.ticketName;
    this.newTicket.description = this.form.value.ticketDescription;

    this.ticketService.addTicket(this.newTicket).subscribe(ticket => this.dialogRef.close(ticket));
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
