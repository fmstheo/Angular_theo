import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {User} from '../../models/User.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscription: Subscription;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.usersService.usersSubject.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.usersService.getUsers();
    this.usersService.emitUsers();
  }

  onNewUser() {
    this.router.navigate(['/users', 'create']);
  }

  onDeleteUser(user: User) {
    this.usersService.removeUser(user);
  }

  onViewUser(id: number) {
    this.router.navigate(['/users', 'view', id]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onUpdateUser(id: number) {
    this.router.navigate(['/users', 'update', id]);
  }

}
