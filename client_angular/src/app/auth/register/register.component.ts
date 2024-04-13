import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../validator/password.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(12), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)]],
      confirmPassword: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    }, { validators: passwordMatchValidator });
    
    
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (!control || !control.errors) {
      return ''; // Ajout pour éviter les erreurs si aucun erreur n'est défini
    }
    if (control.hasError('required')) {
      return 'Ce champ est obligatoire.';
    } else if (control.hasError('email') && field === 'email') {
      return 'Veuillez entrer une adresse email valide.';
    } else if (control.hasError('minLength')) {
      return `Ce champ doit avoir au moins ${control.getError('minLength').requiredLength} caractères.`; // Utilisation de getError pour une meilleure sécurité de type
    } else if (control.hasError('pattern')) {
      return 'Le format du texte est incorrect.';
    } else if (control.hasError('passwordMismatch') && field === 'confirmPassword') {
      return 'Les mots de passe ne correspondent pas.';
    }
    return '';
  }
  

  

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.error = 'Le formulaire n\'est pas valide !';

      return;
    }
    const { email, password, name, firstName } = this.registerForm.value;
    this.authService.register(email, password, name, firstName).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'L\'inscription a échoué !';
      }
    });
  }
  
}
