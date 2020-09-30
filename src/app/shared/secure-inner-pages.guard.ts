import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './auth-service';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {

    constructor(
        public authService: AuthenticationService,
        public router: Router,
        public alertService: AlertService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isLoggedIn) {
            const msg = 'You are already signed in, access denied!';
            this.alertService.showAlert('Alert!', '', msg);
            this.router.navigate(['dashboard']);
        }
        return true;
    }

}
