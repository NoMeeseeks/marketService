import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder)
  private router = inject(Router);
  private authService = inject(AuthService);

  public formularioLogin: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }
  )

  constructor(
    // private router: Router,
  ) {

  }

  login() {
    const { email, password } = this.formularioLogin.value;

    this.authService.iniciarSesion(email, password)
      .subscribe(
        {
          next: () => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: `Bienvenido ${email}`
            });
            this.router.navigateByUrl('/dashboard')
          },
          error: (mensajeDeError) => {
            Swal.fire('Ups!', mensajeDeError, 'error')
          }
        }
      )
  }
}
