import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private appUrl = 'http://localhost:3001/panier'; 

  constructor(private http: HttpClient) { }

  obtenirPanier(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let user = localStorage.getItem('user');
    const body = { id_utilisateur: user };

    return this.http.post<any[]>(`${this.appUrl}/get`, body, { headers }).pipe
    (
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération du panier', error);
        throw error;
      })
    );
    
  }

  avoirProduitPanier(produit : any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const user = localStorage.getItem('user');
    if(!user) {
      console.error('Utilisateur non connecté');
    }
    const body = { id_utilisateur: user, id_produit : produit };
    return this.http.post<any>(`${this.appUrl}/getProduits`, body, {headers} ).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des catégories', error);
        throw error;
      })
    )
  }

  ajouterAuPanier(produit: any): void {
    const token = localStorage.getItem('auth_token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const user = localStorage.getItem('user');
    console.log('user', user);

    const body = { id_utilisateur: user, id_produit: produit.id_produit};

    this.http.post<any>(`${this.appUrl}/add`, body, { headers }).subscribe(
      response => {
        console.log('Réponse de la requête', response);
      },
      error => {
        console.error('Erreur lors de l\'ajout du produit au panier', error);
      }
    );
    
  }

  enleverDuPanier(produit: any): void {
    const token = localStorage.getItem('auth_token');
  
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    const user = localStorage.getItem('user');
    if(!user) {
      console.error('Utilisateur non connecté');
      return;
    }
    const params = new HttpParams()
      .set('id_utilisateur', user)
      .set('id_produit', produit.id_produit);
  
    this.http.delete<any>(`${this.appUrl}/deleteProduit`, { headers, params }).subscribe(
      response => {
        console.log('Réponse de la requête', response);
      },
      error => {
        console.error('Erreur lors de la suppression du produit du panier', error);
      }
    );
  }

  viderPanier(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const user = localStorage.getItem('user');
    if(!user) {
      console.error('Utilisateur non connecté');
      throw new Error('Utilisateur non connecté');
    }
    const params = new HttpParams().set('id_utilisateur', user);

    return this.http.delete<any>(`${this.appUrl}/delete`, { headers, params }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la suppression du panier', error);
        throw error;
      })
    );
  }

  
  removeFromCart(id_produit: any): void {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const user = localStorage.getItem('user');
    if(!user) {
      console.error('Utilisateur non connecté');
      return;
    }
    const params = new HttpParams()
      .set('id_utilisateur', user)
      .set('id_produit', id_produit);

    this.http.delete<any>(`${this.appUrl}/RemoveFromPanier`, { headers, params }).subscribe(
      response => {
        console.log('Réponse de la requête', response);
      },
      error => {
        console.error('Erreur lors de la suppression du produit du panier', error);
      }
    );
  }


  
}
