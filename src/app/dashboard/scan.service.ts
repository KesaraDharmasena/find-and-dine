import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/shared/photo.service';
import * as tmImage from '@teachablemachine/image';
import { FirestoreService } from '../shared/firestore.service';
import { firestore } from 'firebase';
import { YoutubeService } from '../shared/youtube.service';

@Injectable({
    providedIn: 'root'
})

export class ScanService {

    webcamContainer: any;
    videoElement: any;
    ytVideoResults: any;

    URL = '/assets/model/';
    isInitialized = false;

    model: any;
    webcam: any;
    labelContainer: any;
    maxPredictions: any;
    photos = this.photoService.photos;
    photos2 = this.photoService.imageURL;
    userDetails = JSON.parse(localStorage.getItem('myuser'));
    userHistory: any;
    recipeResultsElements: any;

    constructor(
        private routerNavigation: Router,
        public photoService: PhotoService,
        private fireStore: FirestoreService,
        private ytService: YoutubeService
    ) { }

    public addPhotoToGallery() {
        if (this.isInitialized) {
            this.photoService.addNewToGallery().then(() => {
                this.takePicture();
            });
        }
        console.log(this.photos);
    }

    async init(webCamElement, videoElmt, labelElmnt, recipeResults) {
        this.webcamContainer = webCamElement;
        this.videoElement = videoElmt;
        this.recipeResultsElements = recipeResults;
        const modelURL = this.URL + 'model.json';
        const metadataURL = this.URL + 'metadata.json';
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        this.model = await tmImage.load(modelURL, metadataURL);
        console.log('Model Loaded!');
        this.isInitialized = true;
        this.maxPredictions = this.model.getTotalClasses();

        this.labelContainer = labelElmnt;
        this.addPhotoToGallery();
    }

    getHistory() {
        return this.userHistory = this.fireStore.getData('history', this.userDetails.uid);
    }

    // run the webcam image through the image model
    async predict(camShot) {
        // predict can take in an image, video or canvas html element
        const imgElement = document.createElement('img');
        imgElement.src = 'data:image/png;base64, ' + camShot;
        this.webcamContainer.nativeElement.innerHTML = '';
        this.webcamContainer.nativeElement.appendChild(imgElement);
        const prediction = await this.model.predict(imgElement);
        console.log(prediction);
        this.findMax(prediction, this.maxPredictions);

        for (let i = 0; i < this.maxPredictions; i++) {
            if (prediction[i].probability.toFixed(2) > 0.35) {
            }
        }
    }

    async takePicture() {
        this.photos2 = this.photoService.imageURL;
        await this.predict(this.photoService.imageURL);
    }

    async setRecipeResults(foodName: string) {
        const foodDoc = foodName.toLowerCase();
        const recipeData = this.fireStore.getData('recipe', foodDoc).then((foodItem: any) => {
            console.log(foodItem, this.recipeResultsElements);
            localStorage.setItem('fooddata', JSON.stringify(foodItem));
            localStorage.setItem('foodname', JSON.stringify(foodName));
            this.recipeResultsElements.ingredients.nativeElement.innerHTML = foodItem.ingredients;
            this.recipeResultsElements.steps.nativeElement.innerHTML = foodItem.steps;
            this.setHistory(foodName);
        }).catch((error) => {
            console.log(error);
        });
        this.ytService.getVideos(foodName).subscribe((ytVideos) => {
            this.ytVideoResults = ytVideos;
            console.log(ytVideos);
        });
    }

    setHistory(foodName) {
        const nowTime = new Date();
        console.log(nowTime + ':' + foodName);
        const newRecord = {
            [nowTime.toString()]: foodName
        };
        this.fireStore.setData('history', this.userDetails.uid, newRecord);
    }

    findMax(arrayObj, maxIndex) {
        let maxValue = 0;
        let foodName = 'None';
        for (let i = 0; i < maxIndex; i++) {
            if (arrayObj[i].probability.toFixed(2) > maxValue) {
                maxValue = arrayObj[i].probability.toFixed(2);
                foodName = arrayObj[i].className;
            }
            if ((i + 1) === maxIndex) {
                console.log(foodName);
                const classPrediction = foodName;
                this.labelContainer.nativeElement.innerHTML = this.normalizeText(classPrediction);
                console.log(this.labelContainer);
                this.setRecipeResults(foodName);
            }
            console.log(arrayObj[i].probability.toFixed(2));
        }
        return maxValue;
    }

    normalizeText(plainTxt: string) {
        const normalizedText = plainTxt.replace('_', ' ');
        return normalizedText;
    }
}
