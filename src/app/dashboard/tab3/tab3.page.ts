import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/auth-service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { firestore } from 'firebase';
import { User } from '../../shared/auth';
import { AlertService } from 'src/app/shared/alert.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { stateChanges } from '@angular/fire/database';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  @ViewChild('myName', { static: false }) myNameField;
  @ViewChild('myEmail', { static: false }) myEmail;
  @ViewChild('myPhone', { static: false }) myPhone;
  @ViewChild('myCountry', { static: false }) myCountry;

  myUser: any;
  userDetails: any;
  userId: any;
  isEditMode = false;
  pageTitle = 'My Profile';

  constructor(
    private authService: AuthenticationService,
    private _router: Router,
    private fireStore: FirestoreService,
    private alertService: AlertService,
    private ngFireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.myUser = JSON.parse(localStorage.getItem('myuser'));
    this.userId = this.myUser.uid;
    this.fireStore.getUserDetails(this.userId).then((res: any) => {
      this.myUser = res;
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

  navigateBack() {
    this._router.navigateByUrl('/');
  }

  logoutApp() {
    this.authService.SignOut();
  }

  async saveData() {
    this.myUser = {
      displayName: this.myNameField.value,
      email: this.myEmail.value,
      phone: this.myPhone.value,
      country: this.myCountry.value
    };
    this.userDetails = await this.ngFireAuth.currentUser;
    console.log(this.userDetails);
    this.userDetails.updateProfile({
      displayName: this.myNameField.value
    });
    console.log(await this.ngFireAuth.currentUser);
    this.fireStore.setData('users', this.userId, this.myUser).then((msg) => {
      this.alertService.showAlert('', '', msg);
      this.fireStore.getUserDetails(this.userId).then((res: any) => {
        this.myUser = res;
        localStorage.setItem('myuser', JSON.stringify(res));
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    });
    this.isEditMode = false;
    this.pageTitle = 'My Profile';
    const btnElement: HTMLElement = document.querySelector('.fnd__dashboard--scan-btn');
    btnElement.style.visibility = 'visible';
  }

  editData() {
    this.isEditMode = true;
    this.pageTitle = 'Edit Profile';
    const btnElement: HTMLElement = document.querySelector('.fnd__dashboard--scan-btn');
    btnElement.style.visibility = 'hidden';
  }

  cancelEdit() {
    this.isEditMode = false;
    this.pageTitle = 'My Profile';
    const btnElement: HTMLElement = document.querySelector('.fnd__dashboard--scan-btn');
    btnElement.style.visibility = 'visible';
  }

}
