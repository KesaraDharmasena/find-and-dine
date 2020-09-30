import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private ngNavigator: Router
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.ngNavigator.navigate(['signup']);
  }
}
