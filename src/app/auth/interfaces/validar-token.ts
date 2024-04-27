import { Usuario } from "./usuario.interface";

export interface ValidarToken {
    usuario: Usuario;
    token: string;
}

