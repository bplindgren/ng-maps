import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ServerService } from './shared-services/server.service';
import { AuthService } from './shared-services/auth.service';
import { UserService } from './user/user-service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from './shared-services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user/user.component';
import { UserMapComponent } from './user-map/user-map.component';
import { TripComponent } from './trip/trip/trip.component';
import { CreateTripComponent } from './trip/create-trip/create-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserMapComponent,
    TripComponent,
    CreateTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    JwtModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule
  ],
  providers: [ServerService, AuthService, UserService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
