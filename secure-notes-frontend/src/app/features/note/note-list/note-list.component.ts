import { Component } from '@angular/core';
import { NoteResource } from '../../../core/models/note-resource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SanitizeHTMLPipe } from '../../../core/pipes/sanitize-html.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SanitizeHTMLPipe,
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  notes = [
    new NoteResource('uuid1', 'My note 1', 'My content<b> 1 </b>', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My <b> content 2 </b>', 'user1'),
    new NoteResource('uuid2', 'My note 2', '<i>My</i> content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
  ];

  constructor(private readonly router: Router) {}

  protected createNote() {
    this.router.navigateByUrl('/notes/create').then();
  }

  protected deleteNote(id: string) {
    console.log(`delete note ${id}`);
  }
}
