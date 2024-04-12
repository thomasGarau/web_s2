import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  saveCategorieWithImage(formData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    console.log('formData', formData);
    // Utilisez POST ou PUT selon que vous créez ou mettez à jour une catégorie
    return this.http.post<any>(`${this.appUrl}/add`, formData, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la sauvegarde de la catégorie', error);
        throw error;
      })
    );
  }

  updateCategorie(formData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Note: Ne définissez pas le 'Content-Type'. Laissez le navigateur le faire pour vous, ce qui est nécessaire pour `FormData`.
    headers = headers.delete('Content-Type');
  
    return this.http.put<any>(`${this.appUrl}/update`, formData, { headers }).pipe(
      map(response => {
        console.log('Réponse de la requête', response);
        return response;
      }),
      catchError(error => {
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

    const params = new HttpParams().set('id_categorie', id);

    return this.http.delete<any>(`${this.appUrl}/delete`, { headers, params }).pipe(
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
