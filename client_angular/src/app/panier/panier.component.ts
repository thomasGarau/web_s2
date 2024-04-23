import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { ProduitService } from '../services/produit.service';
import { CommonModule } from '@angular/common';
import { get } from 'http';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})


export class PanierComponent implements OnInit {
  produits: any[] = [];
  quantites: { [id_produit: string]: number } = {};
  label : { [id_produit: string]: string } = {};
  prix : { [id_produit: string]: number } = {};
  url : { [id_produit: string]: string } = {};
  total : number = 0;

  constructor(private panierService: PanierService, private produitService: ProduitService ) {}
  

  ngOnInit(): void {
    this.chargerPanier();
  }

  chargerPanier(): void {
    console.log("test")
    this.panierService.obtenirPanier().subscribe({
      next: (panier) => {
        console.log('Panier', panier);
        this.produits = panier;
        panier.forEach(produit => {
          this.quantites[produit.id_produit] = produit.quantite;
          this.getProduit(produit);
        });
        console.log('produits' , this.produits);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du panier', error);
      }
    });
  }

  

  ajouterAuPanier(produit: any): void {
    if (!this.quantites[produit.id_produit]) {
      this.quantites[produit.id_produit] = 0;
    }
    this.quantites[produit.id_produit]++;

    this.panierService.ajouterAuPanier(produit);
    this.calculerTotal();
  }

  enleverDuPanier(produit: any): void {
    if (!this.quantites[produit.id_produit]) {
      this.quantites[produit.id_produit] = 0;
    }
    this.quantites[produit.id_produit]--;
    if(this.quantites[produit.id_produit] <= 0) {
      this.produits = this.produits.filter(p => p.id_produit !== produit.id_produit);
    }

    this.panierService.enleverDuPanier(produit);
    this.calculerTotal();
  }

  enleverDuPanierProduit(produit: any): void {
    this.produits = this.produits.filter(p => p.id_produit !== produit.id_produit);
    this.panierService.removeFromCart(produit.id_produit);
    this.calculerTotal();
  }

  getProduit(produit : any): any {
    this.produitService.getProduit(produit.id_produit).subscribe(
      (data) => {
        this.label[produit.id_produit] = data.label;
        this.prix[produit.id_produit] = data.prix;
        this.url[produit.id_produit] = data.url;
        this.calculerTotal();
      }
    );
  }

  calculerTotal(): void {
    this.total = 0;
    this.produits.forEach(produit => {
      if (this.prix[produit.id_produit] && this.quantites[produit.id_produit]) {
        this.total += this.prix[produit.id_produit] * this.quantites[produit.id_produit];
      }
    });
  }

  viderPanier(): void {
    this.panierService.viderPanier().subscribe({
      next: () => {
       this.chargerPanier();
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression du panier', error);
      }
    });
  }
  
}
