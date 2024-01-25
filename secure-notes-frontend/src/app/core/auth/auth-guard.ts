import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }

    this.exitPage();
    return false;
  }

  private exitPage(): void {
    this.router.navigate(['/login']).then();
  }
}
