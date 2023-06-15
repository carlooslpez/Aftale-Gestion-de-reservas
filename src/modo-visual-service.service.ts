import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModoVisualServiceService {
  modo: string;

  constructor() {
    this.modo = localStorage.getItem('modo-visual') || 'claro';
  }

  cambiarModoVisual(nuevoModo: string) {
    this.modo = nuevoModo;
    localStorage.setItem('modo-visual', nuevoModo);
    // Puedes agregar aquí la lógica adicional para cambiar los estilos globales de la aplicación
  }
}
