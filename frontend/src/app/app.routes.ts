import { Routes } from '@angular/router';
import {Login} from './pages/login';
import { Signup } from './pages/signup';
import { Dashboard } from './pages/dashboard';
import { authGuard } from './services/auth-guard';
import { RoadmapCreate } from './pages/roadmap-create';
import { RoadmapDetail } from './pages/roadmap-detail';
import { MainLayoutComponent } from './layouts/main-layout';

export const routes: Routes = [
    { path:'login',component: Login },
    { path:'signup', component: Signup },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard], 
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'roadmaps/create', component: RoadmapCreate },
            { path: 'roadmaps/:id', component: RoadmapDetail},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    { path:'**', redirectTo: 'dashboard' }, // always last, reminder for myself 
];
