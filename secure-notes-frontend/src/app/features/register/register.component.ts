import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../core/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected registerForm!: FormGroup;
  protected errorMatcher = new ErrorStateMatcher();

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  protected register(): void {
    const user = new User(
      this.emailFormControl.value,
      this.passwordFormControl.value,
    );
    const register$ = this.authService.register(user);
    register$.subscribe({
      next: () => {
        this.redirectAfterSuccessfulRegister();
      },
      error: (err: HttpErrorResponse) => {
        // console.error(err);
        this.showErrorMessage(err.error);
      },
    });
  }

  protected get emailFormControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  protected get passwordFormControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  private createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  private redirectAfterSuccessfulRegister(): void {
    this.router.navigateByUrl('/login').then();
  }

  private showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close');
  }
}
