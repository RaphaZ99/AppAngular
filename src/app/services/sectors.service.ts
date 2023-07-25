import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/interfaces/sector';
import { environment } from 'src/environments/environment.local';
import { ApiResponse } from '../interfaces/api-response';
import { httpOptions } from '../utils/http-util';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Sector>> {
    return this.http.get<ApiResponse<Sector>>(`${environment.url}/sectors`);
  }
  save(sector: Sector): Observable<any> {
    return this.http.post<Sector>(
      `${environment.url}/sectors`,
      sector,
      httpOptions
    );
  }
}
