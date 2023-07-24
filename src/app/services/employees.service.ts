import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  GetAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.url}/employees`);
  }

  GetById(personId: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.url}/employees/${personId}`);
  }

  PostPerson(person: Employee): Observable<any> {
    return this.http.post<Employee>(
      `${environment.url}/employees`,
      person,
      httpOptions
    );
  }

  PutPerson(person: Employee): Observable<any> {
    return this.http.put<Employee>(
      `${environment.url}/employees`,
      person,
      httpOptions
    );
  }

  DeletePerson(personId: string): Observable<any> {
    const apiUrl = `${environment.url}/employees/${personId}`;
    return this.http.delete<string>(apiUrl, httpOptions);
  }
}
