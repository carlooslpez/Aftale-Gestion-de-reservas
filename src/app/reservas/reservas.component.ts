import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable, map } from 'rxjs';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';


interface Reserva{
  id: number; // Add the 'id' property
  fecha:string;
  hora:string;
  comentario:string;
  idPersona:number;
  idServicio:number;
  nombre:string;
}

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})

export class ReservasComponent implements OnInit {
  reservas!: Reserva[];

  constructor(private http: HttpClient, private AlertService:AlertService,private user: UserService, private router:Router) {}

  ngOnInit() {
    this.getReservas().subscribe(
      (reservas: Reserva[]) => {
        this.reservas = reservas;
        console.log(this.reservas)
        
        for (let reserva of reservas) {
          let fecha = new Date(reserva.fecha);
          fecha.setDate(fecha.getDate() );
          reserva.fecha = fecha.toLocaleDateString("en-GB");
          let hora = reserva.hora.slice(0, 5);
          reserva.hora = hora;
        }
      },
      error => {
        console.error('Error retrieving reservations:', error);
        this.AlertService.showAlert('Error al cargar tus reservas');
      }
    );
  }

  getReservas(): Observable<Reserva[]> {
    const url = 'http://localhost:3000/api/reservas';
    const esCliente = this.user.esCliente;
    let id = 0;
    if (esCliente) {
      id = this.user.client.id;
    } else {
      id = this.user.empresa.id;
    }
console.log(id);
    const body = {
      esCliente,
      id,
    };
    console.log(this.user.empresa.id);
    console.log(body);

    return this.http.post<any[]>(url, body).pipe(
      map(response => {
        return response.map(item => ({
          id: item.id_reserva,
          fecha: item.fecha_reserva,
          hora: item.hora_reserva,
          comentario: item.comentario_reserva,
          idPersona: item.id_persona,
          idServicio: item.id_servicio_reserva,
          nombre:item.nombre_reserva
        }));
      })
    );
  }



  cancelarReserva(reservaId: number): void {
    this.http.delete(`http://localhost:3000/api/reservas/`+reservaId).subscribe(
      () => {
        console.log('Reserva cancelada correctamente');
        this.AlertService.showAlert('Reserva cancelada correctamente');
        window.location.reload();
      },
      error => {
        console.error('Error al cancelar la reserva:', error);
        this.AlertService.showAlert('Reserva cancelada con éxito');
        window.location.reload();
      }
    );
  }
  
}