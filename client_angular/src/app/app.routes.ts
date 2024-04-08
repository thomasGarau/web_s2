import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'; // Assurez-vous de créer ce composant
import { AuthGuard } from './guards/auth.guard';
import { ReverseAuthGuard } from './guards/reverse-auth.guard'; // Nouveau guard à créer
import { CategorieComponent } from './categorie/categorie.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [ReverseAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [ReverseAuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'categorie', component: CategorieComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
