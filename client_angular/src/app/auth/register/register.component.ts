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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
    }, { validators: passwordMatchValidator });
    
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.error = 'Le formulaire n\'est pas valide !';
      return;
    }
  
    const { email, password, name, firstName } = this.registerForm.value;
    this.authService.register(email, password, name, firstName).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/categorie']);
      } else {
        this.error = 'L\'inscription a échoué !';
      }
    });
  }
  
}
