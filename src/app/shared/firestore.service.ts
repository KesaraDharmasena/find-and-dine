
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FirestoreService {
    userDetails: any;
    writeData: any;
    readData: any;
    offerData: any;

    constructor(private afs: AngularFirestore) { }

    getUserDetails(userid) {
        const docRef = this.afs.collection('users').doc(userid);
        return this.userDetails = new Promise((resolve, reject) => {
            docRef.get().subscribe((doc) => {
                if (doc.exists) {
                    console.log('Document data:', doc.data());
                    resolve(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                    reject('No such document!');
                }
            });
        });
    }

    setData(fsCollection, fsDoc, fsData: {}) {
        const docRef = this.afs.collection(fsCollection).doc(fsDoc);
        return this.writeData = new Promise((resolve, reject) => {
            docRef.set(fsData, { merge: true }).then(() => {
                console.log('Document successfully written!');
                resolve('Saved Successfully!');
            }).catch((error) => {
                console.error('Error writing document: ', error);
                reject(error);
            });
        });
    }

    getData(fsCollection: string, fsDoc: string) {
        const docRef = this.afs.collection(fsCollection).doc(fsDoc);
        return this.readData = new Promise((resolve, reject) => {
            docRef.get().subscribe((doc) => {
                if (doc.exists) {
                    console.log('Document data:', doc.data());
                    resolve(doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                    reject('No such document!');
                }
            });
        });
    }

    getCollection(fsCollection: string) {
        const docRef = this.afs.collection(fsCollection);
        return this.readData = new Promise((resolve, reject) => {
            docRef.get().subscribe((doc) => {
                if (!doc.empty) {
                    console.log('Document data:', doc.docs);
                    resolve(doc.docs);
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                    reject('No such document!');
                }
            });
        });
    }

    getHistory() {
        return true;
    }
}
