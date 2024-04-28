import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { EstadoAutenticacion } from '../interfaces/estado-autenticacion.enum';

export const autenticadoGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  // const url = state.url;
  // localStorage.setItem('path',url);
  const authService = inject(AuthService)

  if (authService.estadoAutenticado() === EstadoAutenticacion.verificado) {
    return true;
  };
  if (authService.estadoAutenticado() === EstadoAutenticacion.comprobando) {
    return false
  }


  router.navigateByUrl('/auth/login')
  return false;
};
