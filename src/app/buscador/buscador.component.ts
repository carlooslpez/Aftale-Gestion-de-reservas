import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../clase-servicio';

interface Empresa {
  nombre: string;
  descripcion:string
  categoria: string;
}

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  empresas: any[] = [];
  categorias:any = [];
  servicios:Servicio[] = [];
  serviciosFiltrados:Servicio[] = [];
  criterioBusqueda:string="categoria";
  servicio:number=0;
  empresa:string="";
  categoriaElegida:number=0;
  key:string ="";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerEmpresas();
    this.getCategorias();
    this.getServicios();
  }

  obtenerEmpresas(): void {
    this.http.get<any[]>('http://localhost:3000/api/empresas-default/').subscribe(
      data => {console.log(data);
        this.empresas = data.map(empresa => ({
          nombre: empresa.nombre_empresa,
          descripcion: empresa.descripcion_empresa,
          categoria: empresa.nombre_categoria,
        }));
      },
      error => {
        console.error('Error al obtener los datos de las empresas:', error);
      }
    );
  }

  getCategorias(): void {
    console.log("Cargando categorias de la base de datos...");
    this.http.get<any[]>('http://localhost:3000/api/categorias')
      .subscribe(
        (cat: any[]) => {
          this.categorias = cat;
          console.log(this.categorias);
        },
        (error) => {
          console.error('Error al obtener las categorias:', error);
        }
      );
  }
  getServicios(): void {
    console.log("Cargando servicios de la base de datos...");
    this.http.get<any[]>('http://localhost:3000/api/servicios')
      .subscribe(
        (serv: any[]) => {
          this.servicios = serv;
          console.log(this.servicios);
        },
        (error) => {
          console.error('Error al obtener las categorias:', error);
        }
      );
  }

  onSelectChange(){
    this.serviciosFiltrados = this.servicios.filter(servicio => servicio.id_categoria == this.categoriaElegida);
    console.log(this.servicios);
    console.log(this.serviciosFiltrados);
    console.log(this.categoriaElegida);
  }

  getKey(): string {
    if (this.criterioBusqueda === 'categoria') {
      return this.categoriaElegida.toString();
    } else if (this.criterioBusqueda === 'servicio') {console.log("test"+this.servicio);
      return this.servicio.toString();
    } else {
      return '';
    }
  }
}

