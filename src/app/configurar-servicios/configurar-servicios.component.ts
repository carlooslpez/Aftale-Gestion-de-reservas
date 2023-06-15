import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { UserService } from '../user.service';
import { Servicio } from '../clase-servicio';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
@Component({
  selector: 'app-configurar-servicios',
  templateUrl: './configurar-servicios.component.html',
  styleUrls: ['./configurar-servicios.component.css']
})
export class ConfigurarServiciosComponent implements OnInit {
  categoriaElegida: number = 0;
  servicio: number = 0;
  precio: number | undefined;
  categorias: any = [];
  servicios: Servicio[] = [];
  listaServicios = false;
  serviciosempresa: Servicio[] = [];
  serviciosFiltrados: Servicio[] = [];

  constructor(private serviciosservice: ServiciosService,private AlertService:AlertService, private user: UserService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getServiciosEmpresa();
    this.getCategorias();
    this.getServicios();
  }

  getServiciosEmpresa() {
    this.serviciosservice.getServiciosEmpresa(this.user.empresa.id).subscribe(
      (servicios: Servicio[]) => {
        this.serviciosempresa = servicios;
      },
      (error) => {
        console.error('Error al obtener los servicios de la empresa:', error);
      }
    );
  }

  eliminar(id: number) {
    this.serviciosservice.eliminarEmpresaServicio(this.user.empresa.id, id).subscribe(
      (response) => {
        this.AlertService.showAlert('Servicio eliminado correctamente');

         
      },
      (error) => {
        console.error('Error al eliminar el servicio:', error);
        this.AlertService.showAlert('Error al eliminar el servicio');

      }
    );window.location.reload();
  }

  crear(servicio: number, precio: number) {
    this.serviciosservice.crearEmpresaServicio(this.user.empresa.id, servicio, precio).subscribe(
      (response) => {
        this.AlertService.showAlert('Servicio creado correctamente');

        window.location.reload();
      },
      (error) => {
        console.error('Error al crear el servicio:', error);
        this.AlertService.showAlert('Error al crear el servicio');

      }
    );window.location.reload();
  }

  guardar() {
    for (let servicio of this.serviciosempresa) {
      this.eliminar(servicio.id);
      this.crear(servicio.id, servicio.precio);
        
    }
    window.location.reload();
  }

  onSelectChange() {
    this.serviciosFiltrados = this.servicios.filter(servicio => servicio.id_categoria == this.categoriaElegida);
  }

  getCategorias(): void {
    console.log("Cargando categorias de la base de datos...");
    this.http.get<any[]>('http://localhost:3000/api/categorias')
      .subscribe(
        (cat: any[]) => {
          this.categorias = cat;
          console.log(this.categorias)
        },
        (error) => {
          console.error('Error al obtener las categorias:', error);
          this.AlertService.showAlert('Error al obtener las categorias');

        }
      );
  }

  getServicios(): void {
    console.log("Cargando servicios de la base de datos...");
    this.http.get<any[]>('http://localhost:3000/api/servicios')
      .pipe(
        map((serv: any[]) => {
          return serv.map(item => new Servicio(item.nombre_servicio, item.precio, '', item.id, item.id_categoria));
        })
      )
      .subscribe(
        (serv: Servicio[]) => {
          this.servicios = serv;
          console.log(this.servicios);
        },
        (error) => {
          console.error('Error al obtener los servicios:', error);
          this.AlertService.showAlert('Error al obtener los servicios');
        }
      );
  }
}



