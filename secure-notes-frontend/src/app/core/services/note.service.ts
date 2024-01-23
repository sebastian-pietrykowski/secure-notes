import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateNoteRequest } from '../models/create-note-request';
import { Observable } from 'rxjs';
import { NoteResource } from '../models/note-resource';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly notesUrl = `${environment.apiBaseUrl}/notes`;
  constructor(private readonly httpClient: HttpClient) {}

  public createNote(note: CreateNoteRequest): Observable<void> {
    return this.httpClient.post<void>(this.notesUrl, note);
  }

  public getNote(id: string): Observable<NoteResource> {
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.get<CreateNoteRequest>(url);
  }

  public getNotes(): Observable<NoteResource[]> {
    return this.httpClient.get<NoteResource[]>(this.notesUrl);
  }

  public deleteNote(id: string): Observable<void> {
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
