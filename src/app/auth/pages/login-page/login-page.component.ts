import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder)

  private authService = inject(AuthService);

  public formularioLogin: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }
  )

  constructor(

  ) {

  }

  login() {
    const { email, password } = this.formularioLogin.value;

    this.authService.iniciarSesion(email, password)
      .subscribe(succes => {
        console.log(succes);

      })
  }
}
