import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { environment } from 'src/environments/environment.local';
import { httpOptions } from '../utils/http-util';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  save(person: Employee): Observable<any> {
    return this.http.post<Employee>(
      `${environment.url}/employees`,
      person,
      httpOptions
    );
  }
}
