import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Usuario } from '../clase-usuario';
import { Router } from '@angular/router';
import { Empresa } from '../clase-empresa';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-inicioregister',
  templateUrl: './inicioregister.component.html',
  styleUrls: ['./inicioregister.component.css']
})
export class InicioregisterComponent {
  usuario!: Usuario;
  empresa!: Empresa;
  esCliente: boolean = true;
  email: string = "";
  telefono: string = "";
  nacimiento: string = "";
  emailRec: string = "";
  password: string = "";
  password2: string = "";
  nombre: string = "";
  apellidos: string = "";
  empresaInput: string = ""; // Add this line
  cif: string = "";

  constructor(private userService: UserService, private AlertService: AlertService, private router: Router) { }

  cambiarRegistro() {
    this.esCliente = !this.esCliente;
  }

  validarCorreoElectronico(correo: string): boolean {
    return correo.includes('@');
  }

  validarNumeroTelefono(telefono: string): boolean {
    return /^\d+$/.test(telefono);
  }

  register() {
    try {
      if (this.esCliente) {
        if (!this.validarCorreoElectronico(this.email)) {
          this.AlertService.showAlert('El correo electrónico no es válido');
          throw new Error('El correo electrónico no es válido');

        }
        if (!this.validarNumeroTelefono(this.telefono)) {
          this.AlertService.showAlert('El correo electrónico no es válido');
          throw new Error('El número de teléfono no es válido');
        }

        this.usuario = new Usuario(0, this.email, this.nombre, this.apellidos, this.nacimiento, this.telefono, this.emailRec, this.password);
        console.log(this.usuario);
        this.userService.registro(this.usuario).subscribe(
          response => {
            console.log('User registered successfully!', response);
            //this.userService.logIn(this.esCliente, this.email, this.password);

            this.router.navigate(['/']);
          },
          error => {
            console.error('Error registering user:', error);
            this.AlertService.showAlert('Algo salió mal');
          }
        );
      } else {
        if (!this.validarCorreoElectronico(this.email)) {
          throw new Error('El correo electrónico no es válido');
        }
        if (!this.validarNumeroTelefono(this.telefono)) {
          throw new Error('El número de teléfono no es válido');
        }

        this.empresa = new Empresa(0, this.email, this.empresaInput, "", this.nacimiento, this.telefono, this.emailRec, this.cif, "", "", "", "", "", this.password, null);
        console.log(this.empresa);
        this.userService.registro(this.empresa).subscribe(
          response => {
            console.log('User registered successfully!', response);

            if (!this.esCliente) {
              this.router.navigate(['/']);
            }
          },
          error => {
            console.error('Error registering user:', error);
            this.AlertService.showAlert('Algo salió mal');
          }
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
      this.AlertService.showAlert('Algo salió mal');
    }
  }



  cambiarRegister() {
    this.esCliente = !this.esCliente;
  }
}
