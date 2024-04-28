import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EstadoAutenticacion } from '../interfaces';

//public guard  y private guard

export const noAutenticadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const authService = inject(AuthService)

  if (authService.estadoAutenticado() === EstadoAutenticacion.verificado) {
    router.navigateByUrl('/auth/dashboard')
    return false;
  };

  return true;
};
