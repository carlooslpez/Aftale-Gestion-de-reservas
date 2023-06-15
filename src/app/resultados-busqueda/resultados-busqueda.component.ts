import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

class Servicio {
  precio: number;
  nombre_empresa: string;
  id_empresa:number;
  nombre_servicio:string;

  constructor(precio:number, nombre_empresa:string, id_empresa:number, nombre_servicio:string){
    this.precio = precio;
    this.nombre_empresa = nombre_empresa;
    this.id_empresa = id_empresa;
    this.nombre_servicio= nombre_servicio
  }
}

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css']
})
export class ResultadosBusquedaComponent {
  searchBy: any;
  key: any = 1;
  servicios: Servicio[] =[];    

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchBy = params['searchBy'];
      this.key = params['key'];
      console.log('Parameter value:', this.searchBy);
      console.log('Parameter value:', this.key);

      if (this.searchBy === 'servicio') {
        this.buscarServicios();
      }else if (this.searchBy === 'categoria'){
        this.buscarCategoria();
      }else if (this.searchBy === 'empresa'){
        this.buscarEmpresa();
      }
    });
  }

  buscarServicios() {
    const url = 'http://localhost:3000/api/empresa-servicio/' + this.key;
  
    this.http.post<Servicio[]>(url,{}).subscribe(
      (response: Servicio[]) => {
        console.log('API Response:', response);
  
        this.servicios = response;
        console.log(this.servicios);
      },
      (error) => {
        console.error('API request error:', error);
        this.servicios = [];
      }
    );
  }

  buscarCategoria() {
    const url = 'http://localhost:3000/api/empresa-servicio/id_categoria/' + this.key;
  
    this.http.get<Servicio[]>(url).subscribe(
      (response: Servicio[]) => {
        console.log('API Response:', response);
  
        this.servicios = response;
        console.log(this.servicios);
      },
      (error) => {
        console.error('API request error:', error);
        this.servicios = [];
      }
    );
  }

  buscarEmpresa() {
    const url = 'http://localhost:3000/api/empresa-servicio/id_categoria/' + this.key;
  
    this.http.get<Servicio[]>(url).subscribe(
      (response: Servicio[]) => {
        console.log('API Response:', response);
  
        this.servicios = response;
        console.log(this.servicios);
      },
      (error) => {
        console.error('API request error:', error);
        this.servicios = [];
      }
    );
  }
}
