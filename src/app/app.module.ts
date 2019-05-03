import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import { CreateComponent } from './users/create/create.component';
import { WatchComponent } from './users/watch/watch.component';
import { SingleUserComponent } from './users/single-user/single-user.component';
import {RouterModule, Routes} from '@angular/router';
import {UsersService} from './services/users.service';
import { UnlockComponent } from './users/unlock/unlock.component';
import { UpdateComponent } from './users/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AuthComponent,
    HeaderComponent,
    CreateComponent,
    WatchComponent,
    SingleUserComponent,
    UnlockComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
