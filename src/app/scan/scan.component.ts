import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoService } from '../shared/photo.service';
import { max } from '@tensorflow/tfjs';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent implements OnInit, AfterViewInit {

  @ViewChild('webcamContainer', { static: false }) webcamContainer: ElementRef;
  @ViewChild('videoElement', { static: false }) videoElement: ElementRef;

  URL = '/assets/model/';

  model: any;
  webcam: any;
  labelContainer: any;
  maxPredictions: any;
  photos = this.photoService.photos;
  photos2 = this.photoService.imageURL;

  constructor(
    private routerNavigation: Router,
    public photoService: PhotoService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.init();
    //this.runCamera();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery().then(() => {
      this.takePicture();
    });
    console.log(this.photos);

  }

  async init() {
    const modelURL = this.URL + 'model.json';
    const metadataURL = this.URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    // Convenience function to setup a webcam
    /* const flip = true; // whether to flip the webcam
    this.webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await this.webcam.setup(); // request access to the webcam
    this.webcam.play();
    requestAnimationFrame(this.loop.bind(this)); */

    // append elements to the DOM
    //this.webcam_container.nativeElement.appendChild(this.webcam.canvas);
    this.labelContainer = document.getElementById('label-container');
    for (let i = 0; i < this.maxPredictions; i++) { // and class labels
      this.labelContainer.appendChild(document.createElement('div'));
    }
    this.addPhotoToGallery();
  }

  /* async loop() {
    //this.webcam.update(); // update the webcam frame
    await this.predict();
  } */

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
        //console.log(prediction[i].probability.toFixed(2));
        
      }
    }
  }

  async takePicture() {
    //console.log(this.photoService.imageURL);
    this.photos2 = this.photoService.imageURL;
    await this.predict(this.photoService.imageURL);
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
        const classPrediction = foodName + ': ' + maxValue;
        this.labelContainer.childNodes[i].innerHTML = classPrediction;
      }
      console.log(arrayObj[i].probability.toFixed(2));
    }
    return maxValue;
  }

  /* runCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log('"getUserMedia() not supported."');
      return;
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if ('srcObject' in this.videoElement.nativeElement) {
            this.videoElement.nativeElement.srcObject = stream;
          } else {
            this.videoElement.nativeElement.src = window.URL.createObjectURL(stream);
          }
          this.videoElement.nativeElement.onloadedmetadata = (e) => {
            this.videoElement.nativeElement.play();
          };
          const track = stream.getVideoTracks()[0];
          console.log(stream, track);
        })
        .catch((error) => {
          console.log('Something went wrong!', error);
        });
    }
  } */
}
