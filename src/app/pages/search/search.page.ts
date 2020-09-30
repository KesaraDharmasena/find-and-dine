import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  recipeList = [];

  constructor(
    private ngNavigator: Router,
    private fsService: AngularFirestore
  ) { }

  async ngOnInit() {
    console.log(this.recipeList);
  }

  async initializeItems(): Promise<any> {
    const foodList = await this.fsService.collection('recipe').get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const foodData = {
          name: doc.id,
          data: doc.data()
        };
        console.log(foodData);
        this.recipeList.push(foodData);
      });
    });
    return foodList;
  }

  async searchRecipe(evt) {
    const keyword = evt.srcElement.value as string;
    const searchTerm = keyword.toLowerCase();
    this.recipeList = [];

    const foodList = await this.fsService.collection('recipe').get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const foodData = {
          name: 'No result',
          data: {}
        };
        if (this.convertName(doc.id) === searchTerm) {
          foodData.name = doc.id;
          foodData.data = doc.data();
          this.recipeList.push(foodData);
          console.log('Found:', foodData);
        }
      });
    });
    return foodList;
  }

  goBack() {
    this.ngNavigator.navigate(['dashboard']);
  }

  convertName(nameString: string) {
    const convertedName = nameString.replace('_', ' ');
    return convertedName;
  }

}
