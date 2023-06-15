import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstService {
  
  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get<any>('http://api.geonames.org/searchJSON?country=ES&featureClass=P&maxRows=1000&username=demo');
  }
}