import { Injectable, computed, inject, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { EstadoAutenticacion, LoginResponse, Usuario, Registro, ValidarToken } from '../interfaces';

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
    this.verificar().subscribe();
  }

  private setearAutenticacion(usuario: Usuario, token: string): boolean {
    this._usuarioActual.set(usuario);
    this._estadoAutenticado.set(EstadoAutenticacion.verificado);
    localStorage.setItem('token', token)

    return true
  }

  iniciarSesion(correo: string, contrasena: string): Observable<boolean> {

    const url = `${this.urlBase}/auth/iniciarSesion`;
    const body = { correo, contrasena };

    return this.httpClient.post<LoginResponse>(url, body)
      .pipe(
        map(response => this.setearAutenticacion(response.usuario, response.token)),

        // TODO : ERRORES
        catchError(err => throwError(() => err.error.message)

        )
      );

  }

  verificar(): Observable<boolean> {
    const url = `${this.urlBase}/auth/verificarToken`
    const token = localStorage.getItem('token')

    if (!token) {
      this.cerrarSesion();
      return of(false)
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return this.httpClient.get<ValidarToken>(url, { headers })
      .pipe(
        map(response => this.setearAutenticacion(response.usuario, response.token)),

        //error
        catchError(() => {
          this._estadoAutenticado.set(EstadoAutenticacion.noVerificado)
          return of(false)
        })
      )
  }

  cerrarSesion() {
    this._usuarioActual.set(null)
    this._estadoAutenticado.set(EstadoAutenticacion.noVerificado);
    localStorage.removeItem('token')
  }

  registrarse(nombre: string, correo: string, contrasena: string): Observable<boolean> {
    const url = `${this.urlBase}/auth/registrarse`
    const body = {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
    }
    return this.httpClient.post<Registro>(url, body)
      .pipe(
        map(response => true),
        //error
        catchError(() => {
          this._estadoAutenticado.set(EstadoAutenticacion.noVerificado)
          return of(false)
        })
      )
  }

}
