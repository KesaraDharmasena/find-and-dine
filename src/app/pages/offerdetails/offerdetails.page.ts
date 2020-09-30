import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offerdetails',
  templateUrl: './offerdetails.page.html',
  styleUrls: ['./offerdetails.page.scss'],
})
export class OfferdetailsPage implements OnInit {

  myOffers: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ngNavigator: Router
  ) { }

  ngOnInit() {
    const offerId = this.activatedRoute.snapshot.paramMap.get('id');
    const offersData = JSON.parse(localStorage.getItem('offers'));
    const dataResult = offersData.offers.find(obj => {
      return obj[offerId];
    });
    this.myOffers = dataResult[offerId];
    console.log(offersData, offerId, dataResult);
  }

  goBack() {
    this.ngNavigator.navigate(['pages/offers']);
  }

}
