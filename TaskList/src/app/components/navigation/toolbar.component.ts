import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../../modules/authentication/components/login/login.component';
import { RegisterComponent } from '../../modules/authentication/components/register/register.component';
import { User } from 'src/app/model/users/user';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
import { LoginModel } from 'src/app/model/login/loginmodel';
import { LoginResponse } from 'src/app/model/login/loginresponse';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: User;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUser.subscribe(currentUser => {
        this.user = currentUser;
      });
    }

  ngOnInit() {
  }

  openLoginDialog(): void {

    console.log('Open login dialog');

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.login(result);
      }
    });
  }

  openRegisterDialog() {

    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  navigateMainPage() {
    this.router.navigate(['/mainpage']);
  }

  navigateDashboard() {
    this.router.navigate(['/dashboard']);
  }

  login(loginModel: LoginModel): void {
    console.log('Logging in');
    this.authenticationService
      .login(loginModel)
      .pipe(first())
      .subscribe(
        data => {
          console.log('success');
          console.log(data);
        },
        error => {
          console.log('error');
        }
      );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/mainpage']);
  }

  register(username: string, password: string) {
    this.authenticationService
      .register(username, password);
  }

}
