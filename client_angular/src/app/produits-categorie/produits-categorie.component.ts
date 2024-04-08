import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produit-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produits-categorie.component.html',
  styleUrls: ['./produits-categorie.component.scss']
})
export class ProduitsCategorieComponent implements OnInit {
  produits: any[] = [];
  quantites: { [id_produit: string]: number } = {};
  idCategorie: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCategorie = params.get('id');
      if (this.idCategorie) {
        this.loadProduitsParCategorie(this.idCategorie);
      }
    });
  }

  loadProduitsParCategorie(idCategorie: string): void {
    this.produitService.getProduitsParCategorie(idCategorie).subscribe({
      next: (data: any[]) => {
        this.produits = data;
        this.produits.forEach(produit => {
          this.QuantiteProduitPanier(produit);
        });
        console.log('Quantites', this.quantites);
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    });
    
  }

  QuantiteProduitPanier(produit: any): void {
    this.panierService.avoirProduitPanier(produit.id_produit).subscribe(
      (data) => {
        if (data && data.quantite !== undefined) {
          this.quantites[produit.id_produit] = data.quantite;
        } else {
          // Si data est null ou ne contient pas 'quantite', définissez la quantité à 0 ou gérez comme approprié
          this.quantites[produit.id_produit] = 0;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des quantités du panier', error);
      }
    );
  }
  

  

  ajouterAuPanier(produit: any): void {
    if (!this.quantites[produit.id_produit]) {
      this.quantites[produit.id_produit] = 0;
    }
    this.quantites[produit.id_produit]++;

    this.panierService.ajouterAuPanier(produit);
  }

  enleverDuPanier(produit: any): void {
    if (this.quantites[produit.id_produit] && this.quantites[produit.id_produit] > 0) {
      this.quantites[produit.id_produit]--;
    }

    this.panierService.enleverDuPanier(produit);
  }

}
