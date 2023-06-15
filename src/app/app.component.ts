import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ModoVisualServiceService } from 'src/modo-visual-service.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentRoute!: string;
  modoVisual = true;

  constructor(
    public userService: UserService,
    private modoVisualService: ModoVisualServiceService,
    private router: Router
  ) {}

  title = 'Aftale';
  isLoged = this.userService.isLoged;

  obtenerEstiloModoVisual() {
    return this.modoVisualService.modo === 'oscuro' ? 'modo-oscuro' : '';
  }

  obtenerRutaPadding() {
    if (this.currentRoute === '/' || this.currentRoute === '/register' ) {
      this.modoVisual = false;
    }else{this.modoVisual = true;}
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);
        this.obtenerRutaPadding();
      }
    });
  }
}
