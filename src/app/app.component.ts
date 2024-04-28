import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EstadoAutenticacion } from './auth/interfaces/estado-autenticacion.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'marketService';

  private authService = inject(AuthService)
  private router = inject(Router)

  public finalizarVerficacion = computed<boolean>(() => {
    if (this.authService.estadoAutenticado() === EstadoAutenticacion.comprobando) {
      return false;
    }
    return true;
  })

  public estadoAutenticacionEfecto = effect(() => {
    switch (this.authService.estadoAutenticado()) {
      case EstadoAutenticacion.comprobando:
        return;

      case EstadoAutenticacion.verificado:
        this.router.navigateByUrl('/dashboard')
        return;

      case EstadoAutenticacion.noVerificado:
        this.router.navigateByUrl('/auth/login')
        return
    }
  })
}
