import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirestoreService } from './shared/firestore.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalsVariablesStore } from './shared/variables.global';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    Camera,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirestoreService,
    GlobalsVariablesStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
