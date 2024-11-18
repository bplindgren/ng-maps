import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'user-profile/:user', component: UserFormComponent },
  { path: 'create-trip', component: CreateTripComponent },
  { path: 'logout' , component: LogoutComponent },
  { path: '**', component: WelcomeContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
