import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  Form,
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
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  protected login(): void {
    this.redirectAfterLogin();
  }

  protected get usernameFormControl(): FormControl {
    return this.loginForm!.get('username') as FormControl;
  }

  protected get passwordFormControl(): FormControl {
    return this.loginForm!.get('password') as FormControl;
  }

  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private redirectAfterLogin(): void {
    this.router.navigateByUrl('/notes').then();
  }
}
