import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert" *ngIf="alertMessage">
      {{ alertMessage }}
    </div>
  `,
  styles: [`
    .alert {
      position: fixed;
      top: 10%;
      right: 10%;
      padding: 10px;
      background-color: #f44336;
      color: #fff;
      border-radius: 4px;
      z-index:99;
    }
  `]
})
export class AlertComponent implements OnInit {
  alertMessage: string | null = null;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
console.log("oninit");
    this.alertService.alert$.subscribe(message => {
      this.alertMessage = message;
      console.log("mensaje final"+message);
      
      setTimeout(() => {
        this.alertMessage = null;
      }, 3000);
    });
  }

  
}