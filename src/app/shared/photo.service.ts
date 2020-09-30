import { Injectable } from '@angular/core';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';


const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];
  public imageURL: any;

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: false
      }).then((url) => {
        this.imageURL = url.base64String;
        console.log(url);
       });
    } catch (error) {
      console.error('Oops' + error);
    }
  }
}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
