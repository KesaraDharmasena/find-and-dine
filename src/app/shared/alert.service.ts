import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    constructor(public alertController: AlertController) { }

    async showAlert(mHeader, msubHeader, mMessage) {
        const alert = await this.alertController.create({
            header: mHeader,
            subHeader: msubHeader,
            message: mMessage,
            buttons: ['OK'],
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log(result);
    }

    async showAlertButtons(mHeader, mMessage, mButtons) {
        const alert = await this.alertController.create({
            header: mHeader,
            message: mMessage,
            buttons: mButtons
        });

        await alert.present();
        const result = await alert.onDidDismiss();
        console.log(result);
    }
}