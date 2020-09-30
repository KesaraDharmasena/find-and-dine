import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/firestore.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit {

  myOffers: any;

  constructor(
    private ngNavigator: Router,
    private fsDatabase: FirestoreService
  ) { }

  ngOnInit() {
    this.loadOffers();
    console.log(this.fsDatabase.offerData);
  }

  goBack() {
    this.ngNavigator.navigate(['dashboard']);
  }

  loadOffers() {
    this.fsDatabase.getCollection('offers').then((offerData: Array<any>) => {
      this.myOffers = offerData;
      const offerDataObj = {
        offers: []
      };
      offerData.map((dataObj) => {
        console.log(dataObj);
        offerDataObj.offers.push({[dataObj.id]: dataObj.data()});
      });
      localStorage.setItem('offers', JSON.stringify(offerDataObj));
      console.log(offerData, offerData[0].data(), offerDataObj);
    }).catch((errorMsg) => {
      console.log(errorMsg);
    });
  }

}
