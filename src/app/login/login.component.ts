import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/auth-service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() { }

  async logIn(email, password) {
    console.log(this.authService.userData);
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        this.alertService.showAlert('', 'Oops something went wrong!', error.message);
      });
  }

  forgetPassword() {
    this.router.navigate(['forget-password']);
  }

  signInWithGoogle() {
    this.authService.GoogleAuth();
  }
  signInWithFacebook() {
    this.authService.FacebookAuth();
  }
  goToSignup(){
    this.router.navigate(['signup']);
    console.log('done');
  }
}
