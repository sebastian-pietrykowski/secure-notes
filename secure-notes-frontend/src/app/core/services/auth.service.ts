import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {}

  public login(user: User): Observable<void> {
    const url = `${this.authUrl}/login`;

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded',
      ),
      withCredentials: true,
    };

    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('password', user.password);

    return this.httpClient.post<void>(url, body.toString(), options);
  }

  public register(user: User): Observable<void> {
    const url = `${this.authUrl}/register`;
    return this.httpClient.post<void>(url, user);
  }

  public isUserLoggedIn(): boolean {
    return sessionStorage.getItem('logged') === 'true';
  }

  public logout() {
    sessionStorage.setItem('logged', 'false');
    this.cookieService.delete('JSESSIONID');
    this.router.navigateByUrl('/login').then();
  }
}
