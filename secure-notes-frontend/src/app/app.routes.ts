import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'notes',
    loadComponent: () =>
      import('./features/note/note.component').then((c) => c.NoteComponent),
  },
  // { path: '**', redirectTo: '' },
];
