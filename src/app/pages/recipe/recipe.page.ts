import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { YoutubeService } from 'src/app/shared/youtube.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  @ViewChild('webcamContainer', { static: false }) webcamContainer: ElementRef;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;
  @ViewChild('ingredientsBox', { static: false }) ingrediantsElement: ElementRef;
  @ViewChild('recipeBox', { static: false }) stepsElement: ElementRef;
  @ViewChild('videoBox', { static: false }) youtubeElement: ElementRef;

  isRecipeBox = false;
  isVideoBox = false;
  isIngrediants = true;
  ytVideos: any;
  myRecipe = {
    ingredients: 'Loading....',
    steps: 'Loading...',
    image: 'assets/no-image.jpg'
  };
  myFoodName = 'Loading...';

  constructor(
    private ngNavigator: Router,
    private fsService: FirestoreService,
    private ytService: YoutubeService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const foodName = this.activeRoute.snapshot.paramMap.get('foodname');
    this.myFoodName = this.convertName(foodName);
    this.setRecipeResults(foodName);
  }

  goBack() {
    this.navCtrl.back();
  }

  showRecipe() {
    this.isRecipeBox = true;
    this.isVideoBox = false;
    this.isIngrediants = false;
  }

  showVideoBox() {
    this.isVideoBox = true;
    this.isRecipeBox = false;
    this.isIngrediants = false;
  }

  showIngredients() {
    this.isIngrediants = true;
    this.isVideoBox = false;
    this.isRecipeBox = false;
  }

  async setRecipeResults(foodName: string) {
    const foodDoc = foodName.toLowerCase();
    const recipeData = this.fsService.getData('recipe', foodDoc).then((foodItem: any) => {
      console.log(foodItem);
      this.myRecipe = foodItem;
    }).catch((error) => {
      console.log(error);
    });
    this.ytService.getVideos(foodName).subscribe((ytVideos) => {
      this.ytVideos = ytVideos;
      console.log(ytVideos);
    });
  }

  convertName(nameString: string) {
    const convertedName = nameString.replace('_', ' ');
    return convertedName;
  }

  goToNutrition() {
    this.ngNavigator.navigate(['pages/nutritions']);
  }

}
