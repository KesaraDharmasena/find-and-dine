import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { auth } from 'firebase/app';
import { User } from './auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    userData: any;
    myPhone: any;
    myCountry: any;
    platfrom: boolean;

    constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        public alertService: AlertService,

        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.ngFireAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('myuser', JSON.stringify(this.userData));
            } else {
                localStorage.setItem('myuser', null);
            }
        });
        this.platfrom = isPlatformBrowser(platformId);
    }

    // Login in with email/password
    SignIn(email, password) {
        return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }

    // Register user with email/password
    RegisterUser(email, password, phone, country, name) {
        return this.ngFireAuth.createUserWithEmailAndPassword(email, password).then((user) => {
            this.myPhone = phone;
            this.myCountry = country;
            this.SetUserData(user.user, true);
            this.ngFireAuth.currentUser.then((user) => {
                user.updateProfile({
                    displayName: name
                });
            });
        });
    }

    // Email verification when new user register
    SendVerificationMail() {
        return this.ngFireAuth.authState.subscribe((user) => {
            user.updateProfile({
                displayName: name
            }).then(() => {
                console.log(user);
                user.sendEmailVerification().then(() => {
                    this.router.navigate(['verify-email']);
                });
            });
        });
    }

    // Recover password
    PasswordRecover(passwordResetEmail) {
        return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
            const msg = 'Password reset email has been sent, please check your inbox.';
            this.alertService.showAlert('', 'Password Reset', msg);
        }).catch((error) => {

            this.alertService.showAlert('', 'Something went wrong!', error);
        });
    }

    // Returns true when user is looged in
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('myuser'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Returns true when user's email is verified
    get isEmailVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('myuser'));
        return (user.emailVerified !== false) ? true : false;
    }

    // Sign in with Gmail
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
        //this.googlePlus.login({});
    }

    // Sign in with Facebook
    FacebookAuth() {
        return this.AuthLogin(new auth.FacebookAuthProvider());
    }

    // Auth providers
    AuthLogin(provider) {
        if (this.platfrom) {
            this.ngFireAuth.signInWithPopup(provider)
                .then((result) => {
                    this.ngZone.run(() => {
                        this.router.navigate(['dashboard']);
                    });
                    this.SetUserData(result.user, false);
                }).catch((error) => {
                    window.alert(error);
                });
        } else {
            this.ngFireAuth.signInWithRedirect(provider)
                .then((result) => {
                    this.ngZone.run(() => {
                        this.router.navigate(['dashboard']);
                    });
                    console.log(result);
                }).catch((error) => {
                    window.alert(error);
                });
        }
    }

    // Store user in localStorage
    SetUserData(user, emailSignup: boolean) {
        const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
        /* let userData: User; */
        if (emailSignup) {
            this.userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                phone: this.myPhone,
                country: this.myCountry
            };
        } else {
            this.userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                phone: null,
                country: null
            };
        }
        localStorage.setItem('myuser', JSON.stringify(this.userData));
        return userRef.set(this.userData, {
            merge: true
        });
    }

    // Sign-out 
    SignOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('myuser');
            this.router.navigate(['login']);
        });
    }

}