import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User.model';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.user = new User('', '');
    const id = this.route.snapshot.params['id'];
    this.usersService.getSingleUser(+id).then(
      (user: User) => {
        this.user = user;
      }
    );
  }

  onBack() {
    this.router.navigate(['/users/watch']);
  }

}
