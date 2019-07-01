import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/users/user';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User;

  name = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  password2 = new FormControl('', [Validators.required]);

  @Output() openLoginDialog = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
    this.user = new User();
  }

  register() {
    this.dialogRef.close(this.user);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return 'User name is required and should be email';
  }

  getErrorMessagePassword() {
    return this.password.hasError('required')
      ? 'Password is required'
      : this.password.hasError('minLength') ? 'Pasword must be at least 6 digits long' : '';
  }

  getErrorMessagePasswordRetype() {
    return 'Passwords do not match';
  }
}
