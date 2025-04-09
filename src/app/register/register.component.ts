import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  loading = false;
  circles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.generateCircles();
  }

  generateCircles() {
    for (let i = 0; i < 10; i++) {
      this.circles.push({
        'left': `${Math.random() * 100}%`,
        'width': `${Math.random() * 20 + 10}px`,
        'height': `${Math.random() * 20 + 10}px`,
        'animation-delay': `${Math.random() * 5}s`,
        'animation-duration': `${Math.random() * 20 + 10}s`
      });
    }
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.registerForm.value;
      await this.authService.register(email, password).toPromise();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error.code);
    } finally {
      this.loading = false;
    }
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Этот email уже используется';
      case 'auth/invalid-email':
        return 'Некорректный email';
      case 'auth/weak-password':
        return 'Пароль слишком простой';
      default:
        return 'Ошибка при регистрации';
    }
  }
}
