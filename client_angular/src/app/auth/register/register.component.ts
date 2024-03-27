import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../validator/password.validator';

@Component({
  selector: 'app-register',
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
    }, { validators: passwordMatchValidator });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.error = 'Form is not valid!';
      return;
    }

    const { email, password } = this.registerForm.value;
    this.authService.register(email, password).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Registration failed!';
      }
    });
  }
}
