import {HttpClient, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {EnvironmentInjector, inject, INJECTOR, runInInjectionContext} from "@angular/core";
import {Router} from "@angular/router";


export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        sessionStorage.setItem('logged', 'false');
        router.navigateByUrl('/login').then();
        console.log(
          'Unauthorized request detected. Redirecting to login page.',
        );
      }

      // If it's not a 401 error, rethrow the error
      return throwError(() => error);
    }),
  );
};
