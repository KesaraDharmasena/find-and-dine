import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScanService } from '../scan.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit, AfterViewInit {

  myHistory: any;

  constructor(
    private historyData: ScanService,
    private ngNavigator: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.historyData.getHistory().then((historyObj) => {
      this.myHistory = Object.entries(historyObj);
      console.log(historyObj, this.myHistory);
    });
  }

  convertDate(dateString) {
    const dateObj = new Date(Date.parse(dateString));
    return (dateObj.getMonth() + 1) + '/' + dateObj.getDate() + '/' + dateObj.getFullYear() + ' '
      + this.convertTime(dateObj);
  }

  convertTime(timeObj) {
    let hours = timeObj.getHours();
    let minutes = timeObj.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  convertName(nameString: string) {
    const convertedName = nameString.replace('_', ' ');
    return convertedName;
  }

  goBack() {
    this.ngNavigator.navigate(['dashboard']);
  }

}
