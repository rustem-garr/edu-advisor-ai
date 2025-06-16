import { Routes } from '@angular/router';
import {Login} from './pages/login';
import { Signup } from './pages/signup';
import { Dashboard } from './pages/dashboard';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
    { path:'login',component: Login },
    { path:'signup', component: Signup },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path:'**', redirectTo: 'dashboard' }
];
