import { Routes } from '@angular/router';
import {Login} from './pages/login';
import { Signup } from './pages/signup';

export const routes: Routes = [
    { path:'login',component: Login },
    { path:'signup', component: Signup },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
