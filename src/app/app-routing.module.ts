import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {WatchComponent} from './users/watch/watch.component';
import {AuthGuardService} from './services/auth-guard.service';
import {CreateComponent} from './users/create/create.component';
import {SingleUserComponent} from './users/single-user/single-user.component';
import {UnlockComponent} from './users/unlock/unlock.component';
import {UpdateComponent} from './users/update/update.component';

const routes: Routes = [
  {path: 'auth/signin', component: SigninComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'users/watch', canActivate: [AuthGuardService], component: WatchComponent},
  {path: 'users/create', canActivate: [AuthGuardService], component: CreateComponent},
  {path: 'users/single-user', canActivate: [AuthGuardService], component: SingleUserComponent},
  {path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent},
  {path: 'users/unlock', canActivate: [AuthGuardService], component: UnlockComponent},
  {path: 'users/update/:id', canActivate: [AuthGuardService], component: UpdateComponent},
  {path: '', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
