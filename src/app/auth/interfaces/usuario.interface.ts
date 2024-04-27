export interface Usuario {
    _id: string;
    nombre: string;
    roles: string[];
    correo: string;
    es_activo: boolean;
}
