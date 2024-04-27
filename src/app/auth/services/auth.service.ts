import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { EstadoAutenticacion, LoginResponse, Usuario } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //URL DEL BACK END
  private readonly urlBase: string = environments.baseURL;

  //INJECCIONES
  private httpClient = inject(HttpClient);

  private _usuarioActual = signal<Usuario | null>(null);
  private _estadoAutenticado = signal<EstadoAutenticacion>(EstadoAutenticacion.comprobando);

  //! Se muestra al publico
  public usuarioActual = computed(() => this._usuarioActual())
  public estadoAutenticado = computed(() => this._estadoAutenticado())

  constructor(

  ) {

  }

  iniciarSesion(correo: string, contrasena: string): Observable<boolean> {

    const url = `${this.urlBase}/auth/iniciarSesion`;
    const body = { correo, contrasena };

    return this.httpClient.post<LoginResponse>(url, body)
      .pipe(
        //ESTO DISPARA UN EFECTO SECUNDARIO
        tap(response => {
          this._usuarioActual.set(response.usuario);
          this._estadoAutenticado.set(EstadoAutenticacion.verificado);

          localStorage.setItem('token', response.token)
        }),
        map(() => true),

        // TODO : ERRORES
        catchError(err => throwError(() => err.error.message)

        )
      );

  }

}
