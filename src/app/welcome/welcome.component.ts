import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  @ViewChild('slides', { static: false }) slides: ElementRef;
  getStartText = 'Next';

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  //Slider navigate next and Get start btton
  slideNext() {
    this.slides.nativeElement.getActiveIndex().then(activeIndex => {
      if (activeIndex === 2) {
        this.redirectToLogin();
      } else if (activeIndex === 1) {
        this.slides.nativeElement.slideNext();
        this.getStartText = 'Get Started';
      } else {
        this.slides.nativeElement.slideNext();
      }
    });
  }

  redirectToLogin() {
    this._router.navigateByUrl('signup');
  }

}
