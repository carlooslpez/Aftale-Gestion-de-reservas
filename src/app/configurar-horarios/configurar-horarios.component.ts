import { Component } from '@angular/core';
import { HorariosService } from '../horarios.service';
import { UserService } from '../user.service';
import { AlertService } from '../alert.service';

interface Horario {
  dia_semana_horario: number;
  hora_apertura: string;
  hora_cierre: string;
  inicio_descanso: string;
  fin_descanso: string;
}

@Component({
  selector: 'app-configurar-horarios',
  templateUrl: './configurar-horarios.component.html',
  styleUrls: ['./configurar-horarios.component.css']
})
export class ConfigurarHorariosComponent {

 constructor(public horariosser:HorariosService,private AlertService:AlertService, private user:UserService ){}
 horarios:Horario[] = [];
 listaHoras = false;
 nuevoHorario: Horario = {
  dia_semana_horario: 0,
  hora_apertura: '',
  hora_cierre: '',
  inicio_descanso: '',
  fin_descanso: ''
};

 ngOnInit(){
  this.horariosser.getHorarios(this.user.empresa.id).subscribe(
    (response: Horario[]) => {
      console.log('API Response:', response);
      this.horarios = response;
      console.log(this.horarios);
      
    },
    (error) => {
      console.error('API request error:', error);
    }
  );
  
  console.log(this.horarios);
 }

 eliminar(horario: number) {
  this.horariosser.eliminar(this.user.empresa.id, horario).subscribe(
    (response) => {
      // Service deletion successful
      // You can handle any additional logic here
      this.AlertService.showAlert('Horario eliminado correctamente');

      window.location.reload(); 
    },
    (error) => {
      console.error('Error al eliminar el el horario:', error);
      this.AlertService.showAlert('Error al eliminar el horario');

    }
  );
}

crear(horario: Horario) {
  this.horariosser.añadir(this.user.empresa.id, horario).subscribe(
    (response) => {
      // Service creation successful
      // You can handle any additional logic here
      window.location.reload();
      this.AlertService.showAlert('Horario creado correctamente');

    },
    (error) => {
      console.error('Error al crear el servicio:', error);
      this.AlertService.showAlert('Error al crear el horario');

    }
  );
}

guardar() {
  for (let horario of this.horarios) {
    this.eliminar(horario.dia_semana_horario);
    this.crear(horario);
    window.location.reload();  
  }
}

nombreHora(hora:number):string{
  let nombre="";

  switch (hora){
    case 1:
      nombre = "Lunes-viernes";
    break;
    case 6:
      nombre = "Sabado";
    break;
    case 0:
      nombre = "Domingo";
    break;
  }
  return nombre;
}

diasSinHorario(): number[] {
  if (!this.horarios) {
    return [0, 1, 6];
  }

  const diasConHorario = this.horarios.map((horario) => horario.dia_semana_horario);
  const diasPosibles = [0, 1, 6];

  return diasPosibles.filter((dia) => !diasConHorario.includes(dia));
}
}