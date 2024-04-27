import { Routes } from '@angular/router';
import { autenticadoGuard } from './auth/guards/autenticado.guard';

export const routes: Routes = [
    {
        path: 'auth',
        //guards
        loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
    },
    {
        path: 'dashboard',
        canActivate: [autenticadoGuard],
        loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
