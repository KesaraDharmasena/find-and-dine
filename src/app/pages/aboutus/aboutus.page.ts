import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  constructor(
    private ngNavigator: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.ngNavigator.navigate(['dashboard']);
  }

}
