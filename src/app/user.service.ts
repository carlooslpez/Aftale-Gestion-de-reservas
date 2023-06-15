import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './clase-usuario';
import { Empresa } from './clase-empresa';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_KEY = 'user';

  public esCliente:boolean = true;
  public client:Usuario = new Usuario(0,"","","","","","","");
  public empresa:Empresa = new Empresa(0,"","","","","","","","","","","","","");
  nombre:String = this.client.nombre;

  isLoged = this.client.id != 0  || this.empresa.id != 0;
  constructor(private http: HttpClient, private alerts:AlertService, private router: Router) { this.log(); this.loadUserFromSessionStorage()}

  
  private saveUserToSessionStorage(user: Usuario | Empresa): void {
    const type = user instanceof Usuario ? 'Usuario' : 'Empresa';
    const userJson = JSON.stringify({ type, user });
    sessionStorage.setItem(this.USER_KEY, userJson);
  }

  private loadUserFromSessionStorage(): void {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    console.log(userJson);
    if (userJson) {
      const { type, user } = JSON.parse(userJson);
      if (type === 'Usuario') {
        const usuario = new Usuario(
          user.id,
          user.email,
          user.nombre,
          user.apellido,
          user.fechaNacimiento,
          user.telefono,
          user.emailRecuperacion,
          user.password
        );console.log(usuario);
        this.client = usuario;
        this.nombre = this.client.nombre;
        this.isLoged = this.client.id !== 0 || this.empresa.id !== 0;
        this.esCliente = true;
        
      } else if (type === 'Empresa') {
        const empresa = new Empresa(
          user.id,
          user.email,
          user.nombre,
          user.descripcion,
          user.fechaNacimiento,
          user.telefono,
          user.emailRecuperacion,
          user.cif,
          user.ciudad,
          user.telefono2,
          user.telefono3,
          user.direccion,
          user.web,
          user.password
        );console.log(empresa)
        this.empresa = empresa;
        this.nombre = this.empresa.nombre;
        this.isLoged = this.client.id !== 0 || this.empresa.id !== 0;
        this.esCliente = false;
      } else {
        console.log("Invalid user type");
      }
    }else{this.isLoged = false}
  }

  logOut():void{
    //this.router.navigate(['/']);
    this.client = new Usuario(0,"","","","","","","");
    this.empresa = new Empresa(0,"","","","","","","","","","","","","");
    this.clearUserFromSessionStorage();
    this.isLoged = false;
    this.log();
    this.alerts.showAlert('Nos vemos!');
  }

  private clearUserFromSessionStorage(): void {
    sessionStorage.removeItem(this.USER_KEY);
  }

  logIn( esCliente:boolean ,email_usuario: string, contrasena: string) {this.log();
    let url = '';
    if (esCliente) {
      url = 'http://localhost:3000/api/iniciar_sesion';

      const body = {
        email_usuario,
        contrasena
      };
      return this.http.post<any>(url, body).pipe(
        map(response => {
          const { id, email, nombre, apellidos, fechaNacimiento, telefono, emailRecuperacion } = response;
          return new Usuario(id, email, nombre, apellidos, fechaNacimiento, telefono, emailRecuperacion,"");
        })
      ).subscribe(client => {
        this.client = client;
        this.saveUserToSessionStorage(client);
        this.nombre = this.client.nombre;
        console.log(this.client);
        if(client.id!=0){this.isLoged = true}
        this.esCliente = true;
        this.log();
      });
    } else {
      url = 'http://localhost:3000/api/iniciar_sesion_empresa';

      const body = {
        email_usuario,
        contrasena
      };
      return this.http.post<any>(url, body).pipe(
        map(response => {
          const { id, nombre, cif, email_usuario, emailRecuperacion, ciudad, direccion, telefono, telefono2, telefono3, web, descripcion, fechaNcimiento } = response;
          return new Empresa(id, email_usuario, nombre, descripcion, fechaNcimiento, telefono, emailRecuperacion, cif, ciudad, telefono2, telefono3, direccion, web, "");
        })
      ).subscribe(client => {
        this.empresa = client;
        this.saveUserToSessionStorage(client);
        this.nombre = this.empresa.nombre;
        if(client.id!=0){this.isLoged = true}
        this.esCliente = false;
        this.log();
      });
    }
    
    
  }

  registro(user: Usuario | Empresa): Observable<any> {
    let url = ""; // Declare the outer `url` variable
  
    console.log(user);

    const nombre_usuario = user.nombre;
    const email_usuario = user.email;
    const telefono_usuario = user.telefono;
    const pass_usuario = user.pass;
    const email_recuperacion_usuario = user.emailRecuperacion;
    if (user instanceof Usuario) {
    
    const apellidos_usuario = user.apellido;
    const fecha_nacimiento_usuario = user.fechaNacimiento;
    
      
      console.log('The user is of type Usuario');
      url = 'http://localhost:3000/api/usuarios';
      const body = {
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        pass_usuario,
        fecha_nacimiento_usuario,
        telefono_usuario,
        email_recuperacion_usuario
      };
      console.log(url);
      return this.http.post(url, body);
    } else if (user instanceof Empresa) {
            
      
      const  ciudad_empresa = user.ciudad;
      const  direccion_empresa = user.direccion;
      const  fecha_creacion_usuario = user.fechaNacimiento;
      const  telefono2_empresa = user.telefono2;
      const  web_empresa = user.web;

      const cif_empresa = user.cif;
      //modificar
      const horario_empresa = "";
      const telefono3_empresa = "";
      const id_categoria_empresa = "";
      url = 'http://localhost:3000/api/registrar_empresa';
      const body = {
        cif_empresa,
         nombre_usuario,
        email_usuario,
        pass_usuario,
        email_recuperacion_usuario,
        ciudad_empresa,
        direccion_empresa,
        telefono_usuario,
        telefono2_empresa,
        telefono3_empresa,
        web_empresa,
        fecha_creacion_usuario,
        horario_empresa,
        id_categoria_empresa,
      };
      console.log(url);
      return this.http.post(url, body);
    } else {
      console.log('Unknown user type');
      return throwError('Unknown user type');
    }
  }
  
  editar(user: Usuario | Empresa){
    let url = ""; // Declare the outer `url` variable
  
    console.log(user);

    const nombre_usuario = user.nombre;
    const email_usuario = user.email;
    const telefono_usuario = user.telefono;
    const pass_usuario = user.pass;
    const email_recuperacion_usuario = user.emailRecuperacion;
    if (user instanceof Usuario) {
    
    const apellidos_usuario = user.apellido;
    const fecha_nacimiento_usuario = user.fechaNacimiento;
    
      
      console.log('The user is of type Usuario');
      url = 'http://localhost:3000/api/usuarios/'+user.id;
      const body = {
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        pass_usuario,
        fecha_nacimiento_usuario,
        telefono_usuario,
        email_recuperacion_usuario
      };
      console.log(url);
      return this.http.put(url, body);
    } else if (user instanceof Empresa) {
            
      const  cif_empresa = user.cif;
      const  ciudad_empresa = user.ciudad;
      const  direccion_empresa = user.direccion;
      const  fecha_creacion_usuario = user.fechaNacimiento;
      const  telefono2_empresa = user.telefono2;
      const  web_empresa = user.web;
      const  descripcion_empresa = user.descripcion;

      //modificar
      const telefono3_empresa = "";
      url = 'http://localhost:3000/api/empresas/'+user.id;
      const body = {
        nombre_usuario,
        cif_empresa,
        email_usuario,
        pass_usuario,
        email_recuperacion_usuario,
        ciudad_empresa,
        direccion_empresa,
        telefono_usuario,
        telefono2_empresa,
        telefono3_empresa,
        web_empresa,
        descripcion_empresa,
        fecha_creacion_usuario
      };
      console.log(url);
      return this.http.put(url, body);
    } else {
      console.log('Unknown user type');
      return throwError('Unknown user type');
    }
  }

  log(){
    console.log("nombre");
    console.log(this.nombre);
    console.log("cliente");
    console.log(this.client);
    console.log("empresa");
    console.log(this.empresa);
    console.log("escliente:");
    console.log(this.esCliente);
    console.log("isloged");
    console.log(this.isLoged);
  }
}