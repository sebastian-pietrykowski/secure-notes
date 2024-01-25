import {HttpClient, HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('inter');

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const authService = inject(AuthService);
        authService.isUserLoggedIn()
        console.log(
          'Unauthorized request detected. Redirecting to login page.',
        );
      }

      // If it's not a 401 error, rethrow the error
      return throwError(() => error);
    }),
  );
};
