export class Servicio {
  nombre_servicio: string;
  precio: number;
  nombre_empresa: string;
  id: number;
  id_categoria: number;

  constructor(
    nombre_servicio: string,
    precio: number,
    nombre_empresa: string,
    id: number,
    id_categoria: number
  ) {
    this.nombre_servicio = nombre_servicio;
    this.precio = precio;
    this.nombre_empresa = nombre_empresa;
    this.id = id;
    this.id_categoria = id_categoria;
  }
}