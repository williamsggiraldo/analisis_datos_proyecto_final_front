import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosPrediccion } from 'src/model/DatosPrediccion';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  private apiUrl = 'https://174.129.103.196:8000/predict';

  constructor(private http: HttpClient) { }

  predecir(data: DatosPrediccion): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.table(data);
    return this.http.post<any>(`${this.apiUrl}`, data, {headers});
  }

}
