import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AuthenticationService],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
})
export class AuthenticationModule { }
