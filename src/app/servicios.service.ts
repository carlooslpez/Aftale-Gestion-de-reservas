import { Injectable } from '@angular/core';
import { Servicio } from './clase-servicio';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }

  getServiciosEmpresa(id: number): Observable<Servicio[]> {
    const url = `http://localhost:3000/api/empresa-servicio/id_empresa/${id}`;
    const empresaservicioId = id;
    const body = {
      empresaservicioId
    };
    return this.http.post<any>(url, body)
  }

  eliminarEmpresaServicio(id_empresa:number, id_servicio:number){
    const url = `http://localhost:3000/api/borrar-empresa-servicio/${id_servicio}/${id_empresa}`;
    console.log(url);
    const body = {
      id_empresa,
      id_servicio
    };console.log(body);
    return this.http.post<any>(url, body)
  }

  crearEmpresaServicio(id_empresa:number, id_servicio:number, precio:number){
    const url = `http://localhost:3000/api//empresa-servicio`;
    console.log(url);
    const body = {
      id_empresa,
      id_servicio,
      precio
    };console.log(body);
    return this.http.post<any>(url, body)
  }
}
