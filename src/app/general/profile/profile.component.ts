import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/auth-service';
import { FirestoreService } from 'src/app/shared/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  myUser = {
    displayName: 'User',
    email: 'user@example.com'
  };

  constructor(
    private authService: AuthenticationService,
    private _router: Router,
    private fireStore: FirestoreService
  ) { }

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    this.fireStore.getUserDetails(userDetails.uid).then((res: any) => {
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
}
