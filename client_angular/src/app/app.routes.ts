import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'; // Assurez-vous de créer ce composant
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard'; // Nouveau guard à créer
import { CategorieComponent } from './categorie/categorie.component';
import { ProduitsCategorieComponent } from './produits-categorie/produits-categorie.component';
import { PanierComponent } from './panier/panier.component';
import { ProduitBackofficeComponent } from './produit-backoffice/produit-backoffice.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [ReverseAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [ReverseAuthGuard] },
    { path: 'categorie', component: CategorieComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'categories/:id/produits', component: ProduitsCategorieComponent, canActivate: [AuthGuard] },
    { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
    { path: 'produit-backoffice/:id/produits', component: ProduitBackofficeComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
