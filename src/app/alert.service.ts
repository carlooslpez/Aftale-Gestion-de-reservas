import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() {
    const storedData = localStorage.getItem('message');
    const flagstr = localStorage.getItem('flag');
    let flag: number = 1;

    if (flagstr) {
      flag = parseFloat(flagstr);
    }

    if (storedData && flag === 0) {
      localStorage.removeItem('message');
      localStorage.setItem('flag', JSON.stringify(1));
      const alertMessage = JSON.parse(storedData);
      this.showAlert(alertMessage);
    }
  }

  private alertSubject = new Subject<string>();
  public alert$ = this.alertSubject.asObservable();

  showAlert(message: string): void {
    localStorage.setItem('flag', JSON.stringify(0));
    setTimeout(() => {
      this.alertSubject.next(message);
    }, 50);

    localStorage.setItem('message', JSON.stringify(message));
  }

}