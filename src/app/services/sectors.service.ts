import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/interfaces/sector';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  constructor(private http: HttpClient) {}

  GetAll(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${environment.url}/sectors`);
  }
  PostSector(sector: Sector): Observable<any> {
    return this.http.post<Sector>(
      `${environment.url}/sectors`,
      sector,
      httpOptions
    );
  }
}
