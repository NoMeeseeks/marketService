import { Component, Injector, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject(AuthService)

  public usuario = computed(() => this.authService.usuarioActual());

  //de ambas formas esta bien recibirlo
  // get usuario() {
  //   return this.authService.usuarioActual();
  // }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}
