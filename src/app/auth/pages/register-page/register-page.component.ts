import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  public registroFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  registarse() {
    const { nombre, email, password } = this.registroFormulario.value

    this.authService.registrarse(nombre, email, password)
      .subscribe(
        {
          next: () => {
            Swal.fire('Bienvenido', '', 'success')
            this.router.navigateByUrl('/login')
          },
          error: (mensajeDeError) => {
            Swal.fire('Ups!', mensajeDeError, 'error')
          }
        }
      )
  }
}
