import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Usuario } from '../clase-usuario';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private userservice:UserService){}

  usuario!:Usuario;
  esCliente:boolean = true;
  public email: string="prueba@prueba.com";
  public telefono: string="123123";
  public nacimiento: string="2022-01-01";
  public emailRec: string="test@t.com";
  public password: string="1122";
  public password2: string="";
  public nombre: string="juean";
  public apellidos: string="pacolate";

  public web: string="web.com";
  public direccion: string="calle de la oficina";
  public telefono2: string="1123123";
  public ciudad: string="Cordoba";
  public cif: string="123131B";
  public descripcion: string="descripcion";

  cambiarRegistro(){this.esCliente = !this.esCliente}

  register(){
    this.usuario = new Usuario(0,this.email,this.nombre,this.apellidos,this.nacimiento,this.telefono,this.emailRec,this.password);
    console.log(this.usuario);
    this.userservice.registro(this.usuario).subscribe(
      response => {
        console.log('User registered successfully!', response);
        // Handle success response
      },
      error => {
        console.error('Error registering user:', error);
        // Handle error response
      }
    );;
  }
}
