import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './general/profile/profile.component';


// Import canActivate guards
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';
import { ScanComponent } from './scan/scan.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'password-recovery',
    component: ForgetPasswordComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./signup/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule),
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./login/forget-password/forget-password.module').then(m => m.ForgetPasswordPageModule),
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'scan',
    component: ScanComponent
  },
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
