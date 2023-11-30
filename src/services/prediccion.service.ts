import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosPrediccion } from 'src/model/DatosPrediccion';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {

  private apiUrl = 'http://174.129.103.196:8000/predict';
  //private apiUrl = 'https://rickandmortyapi.com/api/character/2';

  constructor(private http: HttpClient) { }

  predecir(data: DatosPrediccion): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Content-Security-Policy', 'upgrade-insecure-requests');
    console.table(data);
    console.table(headers);
    return this.http.post<any>(`${this.apiUrl}`, data, {headers});
    //return this.http.get<any>(`${this.apiUrl}`);
  }

}
