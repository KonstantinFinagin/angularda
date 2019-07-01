import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginModel } from 'src/app/model/login/loginmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.loginModel = new LoginModel();
  }

  login(): void {
    this.dialogRef.close(this.loginModel);
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  getErrorMessage() {
    return 'User email is required';
  }

  getLoginErrorMessage() {
    return 'Wrong user name or password';
  }
}
