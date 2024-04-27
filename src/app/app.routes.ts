import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        //guards
        loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
    },
    {
        path: 'dashboard',
        //guards
        loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
