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
  nouveauProduit: any = {};


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

onFileSelected(event: any, produit: any): void {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    produit.file = file;  
  }
}


loadProduitsByCategorie(idCategorie: string): void {
  this.produitService.getProduitsParCategorie(idCategorie).subscribe({
    next: (produits: any[]) => {
      produits.sort((a, b) => a.id_produit - b.id_produit);
      this.produits = produits;
    },
    error: (error: any) => {
      console.error('Erreur lors de la récupération des produits', error);
    }
  });
}

ajouterProduit(produit: any): void {
  const formData = new FormData();
  formData.append('label', produit.label);
  formData.append('prix', produit.prix.toString());
  formData.append('stock', produit.stock.toString());
  formData.append('id_categorie', this.idCategorie); 
  if (produit.file) {
    formData.append('url', produit.file);
  }

  // Call your service method to add the product
  this.produitService.addProduit(formData).subscribe({
    next: (data: any) => {
      console.log('Produit ajouté', data);
      this.loadProduitsByCategorie(this.idCategorie);
    },
    error: (error: any) => {
      console.error('Erreur lors de l\'ajout du produit', error);
    }
  });
}



modifierLeProduit(produit: any): void {
  produit.enEdition = true;
}

sauvegarder(produit: any): void {
  const formData = new FormData();
  formData.append('label', produit.label);
  formData.append('prix', produit.prix.toString());
  formData.append('stock', produit.stock.toString());
  formData.append('id_produit', produit.id_produit); // Assuming each product has a unique ID
  if (produit.file) {
    formData.append('url', produit.file);
  }

  // Call your service method to update the product
  this.produitService.updateProduit(formData).subscribe({
    next: (data: any) => {
      console.log('Produit mis à jour', data);
      this.loadProduitsByCategorie(this.idCategorie);
    },
    error: (error: any) => {
      console.error('Erreur lors de la mise à jour du produit', error);
    }
  })
}

annulerEdition(produit: any): void {
  this.loadProduitsByCategorie(this.idCategorie);
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

