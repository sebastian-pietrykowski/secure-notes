import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'notes',
    loadComponent: () =>
      import('./features/note/note-list/note-list.component').then(
        (c) => c.NoteListComponent,
      ),
  },
  {
    path: 'notes/show/:id',
    loadComponent: () =>
      import('./features/note/show-note/show-note.component').then(
        (c) => c.ShowNoteComponent,
      ),
  },
  {
    path: 'notes/create',
    loadComponent: () =>
      import('./features/note/create-note/create-note.component').then(
        (c) => c.CreateNoteComponent,
      ),
  },
  // { path: '**', redirectTo: '' },
];
