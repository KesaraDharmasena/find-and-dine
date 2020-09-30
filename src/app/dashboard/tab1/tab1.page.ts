import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  greetingMsg = 'Good Day';
  
  constructor(
    private megAlert: AlertService,
    private ngNavigator: Router
  ) { }

  ngOnInit() {
    this.greetingMessage();
  }

  goToPage(pageLink) {
    this.ngNavigator.navigate([pageLink]);
  }

  greetingMessage() {
    const nowTime = new Date();
    const nowHours = nowTime.getHours();

    if (nowHours < 12) {
      this.greetingMsg = 'Good Morning';
    }
    if (nowHours > 12) {
      this.greetingMsg = 'Good Afternoon';
    }
    if (nowHours == 12) {
      this.greetingMsg = 'Good Noon';
    }
  }

  showMsg() {
    const myButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel:' + blah);
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ];
  }
}
