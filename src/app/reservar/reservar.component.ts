import { Component, OnInit } from '@angular/core';
import { format, parse } from 'date-fns';
import { HorariosService } from '../horarios.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
interface Horario {
  dia_semana_horario: number;
  hora_apertura: string;
  hora_cierre: string;
  inicio_descanso: string;
  fin_descanso: string;
}

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
})
export class ReservarComponent implements OnInit {
  reservationDate!: Date;
  reservationTime!: string;
  availableDays: Horario[] = [];
  comentarios = "";
  empresa = 0;
  servicio = 0;
  constructor(private horarios: HorariosService,private AlertService:AlertService, private route:ActivatedRoute, private http:HttpClient, private user:UserService, private router:Router) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      console.log(params);
      this.empresa = params['empresa'];
      this.servicio = params['servicio'];

      console.log('Parameter value:', this.empresa);
      console.log('Parameter value:', this.servicio);

      this.getHorario();
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    if (day >=1 && day< 6 && this.availableDays.some(day => day.dia_semana_horario === 1)){return true}
    if (day == 6 && this.availableDays.some(day => day.dia_semana_horario === 6)){return true}
    if (day == 0 && this.availableDays.some(day => day.dia_semana_horario === 0)){return true}
    else return false;
    
  };

  getAvailableTimeSlots(): string[] {console.log("slotsfunc");
    if (this.reservationDate) { console.log(this.availableDays);
    let diaSemana = this.reservationDate.getDay();
        if(this.reservationDate.getDay() > 0 && this.reservationDate.getDay() < 6){
          diaSemana = 1;
        }
        console.log("coparar: "+ diaSemana);
      const selectedDay = this.availableDays.find(
        (day) => day.dia_semana_horario === diaSemana
      );console.log(selectedDay);console.log("diadia");
      if (selectedDay) {console.log(selectedDay);
        const startTime = parse(selectedDay.hora_apertura, 'HH:mm:ss', new Date());
        const endTime = parse(selectedDay.hora_cierre, 'HH:mm:ss', new Date());
        const breakStartTime = parse(selectedDay.inicio_descanso, 'HH:mm:ss', new Date());
        const breakEndTime = parse(selectedDay.fin_descanso, 'HH:mm:ss', new Date());
        console.log("start:"+startTime);console.log(breakStartTime);console.log(breakEndTime);console.log(endTime);
        const timeSlots = [];
        let currentTime = startTime;
        console.log(currentTime)
        while (currentTime < breakStartTime) {console.log("inwhile:"+currentTime)
          timeSlots.push(format(currentTime, 'HH:mm'));
          currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // Increment by 30 minutes
        }

        currentTime = breakEndTime; // Skip the break time

        while (currentTime < endTime) {console.log("inwhile:"+currentTime)
          timeSlots.push(format(currentTime, 'HH:mm'));
          currentTime = new Date(currentTime.getTime() + 30 * 60 * 1000); // Increment by 30 minutes
        }

        return timeSlots;
      }
    }
    return [];
  }

  isBreakTime(timeSlot: string): boolean {
    if (this.reservationDate) {
      const selectedDay = this.availableDays.find(
        (day) => day.dia_semana_horario === this.reservationDate.getDay()
      );
      if (selectedDay) {
        const breakStartTime = parse(selectedDay.inicio_descanso, 'HH:mm', new Date());
        const breakEndTime = parse(selectedDay.fin_descanso, 'HH:mm', new Date());
        const selectedTime = parse(timeSlot, 'HH:mm', new Date());

        return selectedTime >= breakStartTime && selectedTime < breakEndTime;
      }
    }
    return false;
  }

  getHorario(){
    this.horarios.getHorarios(1).subscribe(
      (response: Horario[]) => {
        console.log('API Response:', response);
        this.availableDays = response;
        console.log(this.availableDays);
      },
      (error) => {
        console.error('API request error:', error);
      }
    );
  }

  reservar(){
    const url = `http://localhost:3000/api/reservas/registrar`;
    console.log(url);

    const fecha_reserva = new Date(this.reservationDate);
    fecha_reserva.setDate(fecha_reserva.getDate() + 1);

    console.log(fecha_reserva);
    const hora_reserva = this.reservationTime;
    const comentario_reserva = this.comentarios;
    const id_usuario_reserva = this.user.client.id;
    const id_empresa_reserva = this.empresa;
    const id_servicio_reserva = this.servicio;
    
    const body = {
      fecha_reserva,
      hora_reserva,
      comentario_reserva,
      id_usuario_reserva,
      id_empresa_reserva,
      id_servicio_reserva
    };console.log("");console.log(body);
    return this.http.post<any>(url, body).subscribe(
      (response) => {
        console.log('Post request successful:', response);
        this.router.navigate(['/reservas']);
        this.AlertService.showAlert('Reserva realizada correctamente');
      },
      (error) => {
        console.error('Post request error:', error);
        this.AlertService.showAlert('Error al realizar la reserva');
      }
    );
  }
}
