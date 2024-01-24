import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected errorMatcher = new ErrorStateMatcher();

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  protected login(): void {
    const user = new User(
      this.emailFormControl.value,
      this.passwordFormControl.value,
    );
    const login$ = this.authService.login(user);
    login$.subscribe({
      next: () => {
        this.redirectAfterLogin();
      },
      error: (err: Response) => {
        // console.error(err);
        this.showLoginFailureMessage();
      },
    });
  }

  protected get emailFormControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  protected get passwordFormControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private redirectAfterLogin(): void {
    this.router.navigateByUrl('/notes').then();
  }

  private showLoginFailureMessage() {
    this.snackBar.open('Login failure', 'Close');
  }
}
