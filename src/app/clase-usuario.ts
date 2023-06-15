export class Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
  emailRecuperacion: string;
  pass: string;

  constructor();
  constructor(
    id: number,
    email: string,
    nombre: string,
    apellido: string,
    fechaNacimiento: string,
    telefono: string,
    emailRecuperacion: string,
    pass: string
  );
  constructor(
    id?: number,
    email?: string,
    nombre?: string,
    apellido?: string,
    fechaNacimiento?: string,
    telefono?: string,
    emailRecuperacion?: string,
    pass?: string
  ) {
    this.id = id || 0;
    this.email = email || '';
    this.nombre = nombre || '';
    this.apellido = apellido || '';
    this.fechaNacimiento = fechaNacimiento || '';
    this.telefono = telefono || '';
    this.emailRecuperacion = emailRecuperacion || '';
    this.pass = pass || '';
  }
}