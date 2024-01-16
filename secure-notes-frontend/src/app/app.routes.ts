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
      import('./features/note/note-list/note-list.component').then(
        (c) => c.NoteListComponent,
      ),
  },
  // { path: '**', redirectTo: '' },
];
