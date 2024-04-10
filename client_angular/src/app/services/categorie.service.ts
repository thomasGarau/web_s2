import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategorieService {
  private appUrl = 'http://localhost:3001/categorie';
  
  constructor(private http: HttpClient) {}

  getALLCategories(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any[]>(`${this.appUrl}/all`, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des catégories', error);
        throw error;
      })
    );
  }

  updateCategorie(category: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.put<any>(`${this.appUrl}/${category.id}`, category, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la mise à jour de la catégorie', error);
        throw error;
      })
    );
  }

  deleteCategorie(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.delete<any>(`${this.appUrl}/${id}`, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la suppression de la catégorie', error);
        throw error;
      })
    );
  }
}
