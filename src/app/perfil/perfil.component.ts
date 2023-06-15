import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Usuario } from '../clase-usuario';
import { Empresa } from '../clase-empresa';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(public user:UserService){}
  usuario!:Usuario|Empresa;
  esCliente: boolean = true;

  cif:string = this.user.empresa.cif;
  ciudad:string = this.user.empresa.ciudad;
  direccion:string = this.user.empresa.direccion;
  web:string = this.user.empresa.web;
  descripcion:string = this.user.empresa.descripcion;

  fecha!:string;

  apellidos: string = this.user.client.apellido;


  ngOnInit(){
    console.log("apellido"+this.apellidos);
    this.esCliente = this.user.esCliente;
    this.usuario = this.user.esCliente ? this.user.client : this.user.empresa;
    console.log(this.usuario);
    this.fecha = this.formatDate(this.usuario.fechaNacimiento);
    console.log(this.fecha);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  guardar() {
    let usuarioGuardar: Empresa | Usuario;
  
    if (this.usuario instanceof Empresa) {
      usuarioGuardar = new Empresa();
      usuarioGuardar = this.usuario;
      usuarioGuardar.ciudad = this.ciudad;
      usuarioGuardar.direccion = this.direccion;
      usuarioGuardar.web = this.web;
      usuarioGuardar.descripcion = this.descripcion;
      usuarioGuardar.fechaNacimiento = this.fecha;
      console.log(usuarioGuardar);
  
      this.user.editar(usuarioGuardar).subscribe(
        response => {
          // Handle the response here
          console.log('User updated successfully:', response);
        },
        error => {
          // Handle the error here
          console.error('Error updating user:', error);
        }
      ); // <-- Added closing parenthesis here
  
    } else {
      usuarioGuardar = new Usuario();
      usuarioGuardar = this.usuario;
      usuarioGuardar.apellido = this.apellidos;
      usuarioGuardar.fechaNacimiento = this.fecha;
    }
  }
  
}
