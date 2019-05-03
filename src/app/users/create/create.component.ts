import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User.model';
import {Subscription} from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  userForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      photo: ''
    });
  }

  onSaveUser() {
    const lastName = this.userForm.get('lastName').value;
    const name = this.userForm.get('name').value;
    const newUser = new User(lastName, name);
    if (this.fileUrl && this.fileUrl !== '') {
      newUser.photo = this.fileUrl;
    }
    this.usersService.createNewUser(newUser);
    this.router.navigate(['/users/watch']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.usersService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
