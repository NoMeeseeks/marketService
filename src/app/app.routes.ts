import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        //guards
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        //guards
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
