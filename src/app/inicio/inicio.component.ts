import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public email: string = "";
  public password: string = "";
  esCliente: boolean = true;
  error: string = "";

  constructor(private userService: UserService,private AlertService:AlertService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.isLoged) {
      if (this.userService.esCliente) {
        this.router.navigate(['/buscador']);
      } else {
        this.router.navigate(['reservas']);
      }
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      try {
        //this.userService.logIn(this.email, this.password);
        form.reset();
        
      } catch (error) {
        this.error = "Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.";
        console.error(error);
        this.AlertService.showAlert('Error al iniciar sesion');

      }
    }
  }

  login() {
    try {
      this.userService.logIn(this.esCliente, this.email, this.password);
      window.location.reload();
      this.AlertService.showAlert('iniciada sesion');
    } catch (error) {
      this.error = "Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.";
      console.error(error);
      this.AlertService.showAlert('Error al iniciar sesion');

    }
  }

  cambiarLogin() {
    this.esCliente = !this.esCliente;
  }
}
