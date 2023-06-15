import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Horario{
  dia_semana_horario:number;
  hora_apertura:string;
  hora_cierre:string;
  inicio_descanso:string;
  fin_descanso:string;
}

/*interface Horario{
  dayOfWeek:number;
  startTime:string;
  endTime:string;
  breakStartTime:string;
  breakEndTime:string;
}*/

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  

  constructor(private http:HttpClient) { }

  getHorarios(id_empresa: number) {
    const url = 'http://localhost:3000/api/horarios_empresas/empresa/' + id_empresa;
    console.log(url);
    return this.http.get<Horario[]>(url,{});
  }

  eliminar(id_empresa:number, horario:number){
    const url = `http://localhost:3000/api/horarios_empresas/borrar/`;
    console.log(url);
    const body = {
      id_empresa,
      horario
    };console.log(body);
    return this.http.post<any>(url, body)
  }

  añadir(id_empresa:number, horario:Horario){
    const url = `http://localhost:3000/api/horarios_empresas/agregar`;
    console.log(url);
    const dia_semana_horario = horario.dia_semana_horario;
    const hora_apertura = horario.hora_apertura;
    const hora_cierre = horario.hora_cierre;
    const inicio_descanso = horario.inicio_descanso;
    const fin_descanso = horario.fin_descanso;
    const body = {
      id_empresa,
        dia_semana_horario,
        hora_apertura,
        hora_cierre,
        inicio_descanso,
        fin_descanso,
    };console.log(body);
    return this.http.post<any>(url, body)
  }
}
