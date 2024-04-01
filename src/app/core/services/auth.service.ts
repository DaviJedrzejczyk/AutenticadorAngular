import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = signal<string>('http://localhost:3000');

  constructor(private http: HttpClient, private router: Router) {}

  public signIn(payLoad: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.url()}/sign`, payLoad)
      .pipe(
        map((data) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', data.token);
          return this.router.navigate(['admin']);
        }),
        catchError((e) => {
          if (e.error.message) return throwError(() => e.error.message);
          return throwError(
            () =>
              'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
          );
        })
      );
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
