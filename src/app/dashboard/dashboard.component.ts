import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController, IonTabs } from '@ionic/angular';
import { ScanService } from './scan.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @ViewChild('scanButton', { static: false }) scanButton: IonTabs;

  thisUser: any;
  userName = 'User';

  constructor(
    private menu: MenuController,
    public scanService: ScanService,
    private ngNavigator: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (!this.authService.platfrom) {
      this.authService.SetUserData(this.authService.userData, false);
    }
    this.thisUser = JSON.parse(localStorage.getItem('myuser'));
    this.userName = this.thisUser.displayName;
    console.log(this.thisUser, this.authService.userData);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  clickTrigger() {
    this.scanButton.select('tab2');
    this.reScan();
  }

  reScan() {
    this.scanService.addPhotoToGallery();
  }

  goToPage(pageLink) {
    this.ngNavigator.navigate([pageLink]);
  }

  logoutApp() {
    this.authService.SignOut();
  }

  reloadData() {
    this.thisUser = JSON.parse(localStorage.getItem('myuser'));
    this.userName = this.thisUser.displayName;
    console.log(this.thisUser);
  }
}
