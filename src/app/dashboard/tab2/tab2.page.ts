import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/shared/photo.service';
import * as tmImage from '@teachablemachine/image';
import { ScanService } from 'src/app/dashboard/scan.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild('webcamContainer', { static: false }) webcamContainer: ElementRef;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;
  @ViewChild('ingredientsBox', { static: false }) ingrediantsElement: ElementRef;
  @ViewChild('recipeBox', { static: false }) stepsElement: ElementRef;
  @ViewChild('videoBox', { static: false }) youtubeElement: ElementRef;
  @ViewChild('labelBox', { static: false }) labelBox: ElementRef;

  isRecipeBox = false;
  isVideoBox = false;
  isIngrediants = true;
  ytVideos: any;
  navFixed = false;
  scrollOffset = 70;

  constructor(
    private routerNavigation: Router,
    public photoService: PhotoService,
    public scanService: ScanService
  ) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    console.log(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop, this.navFixed);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    const recipeResults = {
      ingredients: this.ingrediantsElement,
      steps: this.stepsElement,
      video: this.videoElement
    };
    this.scanService.init(this.webcamContainer, this.videoElement, this.labelBox, recipeResults);
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
    this.ytVideos = this.scanService.ytVideoResults;
  }

  showIngredients() {
    this.isIngrediants = true;
    this.isVideoBox = false;
    this.isRecipeBox = false;
  }

  goToNutrition() {
    this.routerNavigation.navigate(['pages/nutritions']);
  }
}
