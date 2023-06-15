import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { ResultadosBusquedaComponent } from './resultados-busqueda/resultados-busqueda.component';
import { ReservarComponent } from './reservar/reservar.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioregisterComponent } from './inicioregister/inicioregister.component';
import { ConfigurarServiciosComponent } from './configurar-servicios/configurar-servicios.component';
import { ConfigurarHorariosComponent } from './configurar-horarios/configurar-horarios.component';
import { ReservasComponent } from './reservas/reservas.component';
import { BuscadorComponent } from './buscador/buscador.component';




const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'perfil', component: PerfilComponent },
  {path: 'busqueda/:searchBy/:key', component: ResultadosBusquedaComponent},
  {path: 'register', component: InicioregisterComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'reservar/:empresa/:servicio', component: ReservarComponent},
  {path: 'gestionar-servicios', component: ConfigurarServiciosComponent},
  {path: 'gestionar-horario', component: ConfigurarHorariosComponent},
  {path: 'reservas', component: ReservasComponent},
  {path: 'buscador', component: BuscadorComponent}


   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
