import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit-backoffice',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './produit-backoffice.component.html',
  styleUrl: './produit-backoffice.component.scss'
})
export class ProduitBackofficeComponent {
  produits: any[] = [];
  idCategorie : any;
  nouveauProduit = { label: '', prix: 0, stock: 0, id_categorie : 0};
  produitsBackup: any[] = [];


constructor(
  private authService: AuthService, 
  private router: Router, 
  private route : ActivatedRoute, 
  private produitService: ProduitService, 
  private panierService: PanierService) {}


ngOnInit(): void {
  if (!this.authService.isAdmin()) {
    this.router.navigate(['/categorie']);
  } else {
    this.route.paramMap.subscribe(params => {
      this.idCategorie = params.get('id'); // Assurez-vous que 'idCategorie' correspond au nom du paramètre défini dans vos routes
      if (this.idCategorie) {
        this.loadProduitsByCategorie(this.idCategorie);
      }
    });
  }
}

loadProduitsByCategorie(idCategorie: string): void {
  this.produitService.getProduitsParCategorie(idCategorie).subscribe({
    next: (produits: any[]) => {
      this.produits = produits;
    },
    error: (error: any) => {
      console.error('Erreur lors de la récupération des produits', error);
    }
  });
}

ajouterProduit(): void {
  this.nouveauProduit.id_categorie = this.idCategorie;
  if(this.nouveauProduit.label && this.nouveauProduit.prix > 0 && this.nouveauProduit.stock > 0 && this.nouveauProduit.id_categorie > 0){
    console.log("Ajout du produit en cours...", this.nouveauProduit)
    this.produitService.addProduit(this.nouveauProduit).subscribe({
      next: (produit) => {
        this.produits.push(produit); // Ajoutez le nouveau produit à la liste affichée
        this.nouveauProduit = { label: '', prix: 0, stock: 0, id_categorie: 0 }; // Réinitialisez le formulaire
        console.log("Produit ajouté avec succès !");
        this.loadProduitsByCategorie(this.idCategorie);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
      }
    });
  } else {
    console.error("Veuillez remplir tous les champs correctement.");
  }

}

modifierLeProduit(produit: any, index: number): void {
  produit.enEdition = true;
  this.produitsBackup[index] = { ...produit };
  this.produits[index] = { ...produit };
}

sauvegarder(produit: any, index: number): void {
  produit.enEdition = false;
  this.produitService.updateProduit(produit).subscribe({
    next: (produit: any) => {
      console.log('Produit mis à jour avec succès', produit);
    },
    error: (error) => {
      console.error('Erreur lors de la mise à jour du produit', error);
    }
  });
}

annulerEdition(produit: any, index: number): void {
  produit.enEdition = false;
  this.produits[index] = { ...this.produitsBackup[index] };
}

supprimerProduit(produit: any): void {
  this.produitService.deleteProduit(produit.id_produit).subscribe({
    next: (data: any) => {
      console.log('Produit supprimé', data);
      this.loadProduitsByCategorie(this.idCategorie);
    },
    error: (error: any) => {
      console.error('Erreur lors de la suppression du produit', error);
    }
  });
}



}

