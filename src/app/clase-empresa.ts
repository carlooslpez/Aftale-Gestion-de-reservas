export class Empresa {
  id: number;
  email: string;
  nombre: string;
  descripcion: string;
  pass: string;
  cif: string;
  ciudad: string;
  telefono: string;
  telefono2: string;
  telefono3: string;
  direccion: string;
  web: string;
  emailRecuperacion: string;
  fechaNacimiento: string;
  fotoEmpresa: File | null;

  constructor(
    id: number = 0,
    email: string = '',
    nombre: string = '',
    descripcion: string = '',
    fechaNacimiento: string = '',
    telefono: string = '',
    emailRecuperacion: string = '',
    cif: string = '',
    ciudad: string = '',
    telefono2: string = '',
    telefono3: string = '',
    direccion: string = '',
    web: string = '',
    pass: string = '',
    fotoEmpresa: File | null = null
  ) {
    this.id = id;
    this.email = email;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fechaNacimiento = fechaNacimiento;
    this.telefono = telefono;
    this.emailRecuperacion = emailRecuperacion;
    this.cif = cif;
    this.ciudad = ciudad;
    this.telefono2 = telefono2;
    this.telefono3 = telefono3;
    this.direccion = direccion;
    this.web = web;
    this.pass = pass;
    this.fotoEmpresa = fotoEmpresa;
  }
}
