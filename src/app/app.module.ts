import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { PerfilComponent } from './perfil/perfil.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { MatInputModule } from '@angular/material/input';
import { ReservarComponent } from './reservar/reservar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistroComponent } from './registro/registro.component';
import { AftaleTopMenuComponent } from './Views/aftale-top-menu/aftale-top-menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioregisterComponent } from './inicioregister/inicioregister.component';
import { ConfigurarServiciosComponent } from './configurar-servicios/configurar-servicios.component';
import { ConfigurarHorariosComponent } from './configurar-horarios/configurar-horarios.component';
import { ReservasComponent } from './reservas/reservas.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { AlertComponent } from './alert/alert.component';




@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    ResultadosBusquedaComponent,
    ReservarComponent,
    RegistroComponent,
    AftaleTopMenuComponent,
    InicioComponent,
    InicioregisterComponent,
    ConfigurarServiciosComponent,
    ConfigurarHorariosComponent,
    ReservasComponent,
    BuscadorComponent,
    AlertComponent,
    
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
