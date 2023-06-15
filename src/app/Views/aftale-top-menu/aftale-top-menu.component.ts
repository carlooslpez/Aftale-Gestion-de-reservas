import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ModoVisualServiceService } from 'src/modo-visual-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-aftale-top-menu',
  templateUrl: './aftale-top-menu.component.html',
  styleUrls: ['./aftale-top-menu.component.css']
})
export class AftaleTopMenuComponent {
  modo: boolean = false; // Asigna un valor inicial a la propiedad 'modo'

  constructor(public user: UserService, private modoVisualService: ModoVisualServiceService) {}

  ngOnInit() {
    this.modo = this.modoVisualService.modo == "claro" ? false : true;

    $(document).ready(function () {
      $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
      });
    });
  }

  logout() {
    this.user.logOut();
  }

  cambiarModoVisual(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const nuevoModo = checkbox.checked ? 'oscuro' : 'claro';
    this.modoVisualService.cambiarModoVisual(nuevoModo);
  }
}
