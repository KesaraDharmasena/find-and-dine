import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() { }

  signUp(email, password, phone, country, myname) {
    this.authService.RegisterUser(email.value, password.value, phone.value, country.value, myname.value).then((res) => {
      this.authService.SendVerificationMail();
      this.router.navigate(['verify-email']);
      console.log(res);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  signInWithGoogle() {
    this.authService.GoogleAuth();
  }
  signInWithFacebook() {
    this.authService.FacebookAuth();
  }
  goToLogin(){
    this.router.navigate(['login']);
  }
}
