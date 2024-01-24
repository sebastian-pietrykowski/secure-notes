import { Component } from '@angular/core';
import { NoteResource } from '../../../core/models/note-resource';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SanitizeHTMLPipe } from '../../../core/pipes/sanitize-html.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { NoteService } from '../../../core/services/note.service';
import {AsyncPipe, NgForOf} from "@angular/common";
import {map, startWith, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SanitizeHTMLPipe,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  private readonly subject = new Subject();
  protected readonly notes$ = this.subject.asObservable().pipe(
    startWith(0),
    switchMap(() => this.noteService.getNotes()));

  constructor(
    private readonly noteService: NoteService,
    private readonly router: Router,
  ) {}

  protected createNote() {
    this.router.navigateByUrl('/notes/create').then();
  }

  protected deleteNote(id: string) {
    const delete$ = this.noteService.deleteNote(id);
    delete$.subscribe({
      next: () => {
        this.subject.next(0);
      }
    });
  }

  protected showNote(id: string) {
    console.log(`delete note ${id}`);
  }
}
