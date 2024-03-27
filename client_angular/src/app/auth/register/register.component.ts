import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../validator/password.validator'; // Make sure to create this custom validator.

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null; // Make sure to declare the error field if you're using it.

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Initialize the form directly in the constructor
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordMatchValidator }); // Use 'validators' instead of 'validator'
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.error = 'Form is not valid!';
      return;
    }

    const { email, password } = this.registerForm.value;
    this.authService.register(email, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Registration failed!';
      }
    });
  }
}
