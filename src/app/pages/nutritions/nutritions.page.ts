import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.page.html',
  styleUrls: ['./nutritions.page.scss'],
})
export class NutritionsPage implements OnInit {

  foodName: string;
  foodData: any;

  constructor(
    private ngNavigator: Router,
    private activeLink: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.foodName = this.convertName(localStorage.getItem('foodname'));
    this.foodData = JSON.parse(localStorage.getItem('fooddata'));
    console.log(this.foodName, this.foodData);
  }

  goBack() {
    this.navCtrl.back();
  }

  convertName(nameString: string) {
    const convertedName = nameString.replace('_', ' ');
    return convertedName;
  }

}
