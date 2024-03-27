import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://your-api-url';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password })
      .pipe(
        map(response => {
          localStorage.setItem('auth_token', response.token);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/register`, { email, password })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
