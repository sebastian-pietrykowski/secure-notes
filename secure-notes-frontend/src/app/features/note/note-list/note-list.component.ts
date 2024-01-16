import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NoteResource } from '../../../core/models/note-resource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SanitizeTextStylePipe } from '../../../core/pipes/sanitize-text-style.pipe';
import { MatIconModule } from '@angular/material/icon';
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SanitizeTextStylePipe,
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  boldText = 'asa<b>ba</b>';
  notes = [
    new NoteResource('uuid1', 'My note 1', 'My content<b> 1 </b>', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My <b> content 2 </b>', 'user1'),
    new NoteResource('uuid2', 'My note 2', '<i>My</i> content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
    new NoteResource('uuid2', 'My note 2', 'My content 2', 'user1'),
  ];

  protected addNote() {
    console.log('add note');
  }

  protected deleteNote(id: string) {
    console.log(`delete note ${id}`);
  }
}
