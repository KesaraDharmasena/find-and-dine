import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/auth-service';
import { AlertService } from 'src/app/shared/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private ngNavigator: Router
  ) { }

  ngOnInit() {
  }
  forgetPassword(email) {
    this.authService.PasswordRecover(email.value).then((res) => {
      // Email sent
      console.log(res);
    }).catch((error) => {
      // An error happened
      this.alertService.showAlert('', 'Warning', error);
    });
  }
  goToSignup(){
    this.ngNavigator.navigate(['signup']);
  }
  goBack(){
    this.ngNavigator.navigate(['login']);
  }
}
