import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServerService {
  private baseUrl = 'http://localhost:8080';
  public loggedIn = false;
  public token: string;

  constructor(private http: HttpClient) { }

  setLoggedIn(loggedIn: boolean, token?: string): Observable<Boolean> {
    this.loggedIn = loggedIn;
    this.token = token;
    // of automatically creates an Observable
    return of(true);
  }

  getHeader(): any {
    let header;
    if (this.loggedIn) {
      header = { 'Authorization': `Bearer ${this.token}`, 'Access-Control-Allow-Origin': '*' };
    } else if (localStorage.token) {
      this.token = localStorage.token;
      this.loggedIn = true;
      header = { 'Authorization': `Bearer ${localStorage.token}`, 'Access-Control-Allow-Origin': '*' };
    }
    return header;
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }

    const header = this.getHeader();

    return this.http.request(method, this.baseUrl + route, {
      body: data,
      responseType: 'json',
      observe: 'response',
      headers: header
    });
  }

  get(route: string, data?: any) {
    const header = this.getHeader();

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(this.baseUrl + route, {
      responseType: 'json',
      headers: header,
      params
    });
  }

}
