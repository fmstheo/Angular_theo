import { Injectable } from '@angular/core';
import {User} from '../models/User.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {reject, resolve} from 'q';
import {error} from 'util';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UsersService {

  users: User[] = [];
  usersSubject = new Subject<User[]>();

  constructor() {
  }
  emitUsers() {
    this.usersSubject.next(this.users);
  }
  saveUsers() {
    firebase.database().ref('/users').set(this.users);
  }

  getUsers() {
    firebase.database().ref('/users')
      .on('value', (data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      });
  }

  getSingleUser(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewUser(newUser: User) {
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }

  removeUser(user: User) {
    if (user.photo) {
      const storageRef = firebase.storage().refFromURL(user.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const userIndexToRemove = this.users.findIndex(
      (userEl) => {
        if (userEl === user) {
          return true;
        }
      }
    );
    this.users.splice(userIndexToRemove, 1);
    this.saveUsers();
    this.emitUsers();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
