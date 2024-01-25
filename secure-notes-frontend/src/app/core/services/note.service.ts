import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CreateNoteRequest } from '../models/create-note-request';
import { Observable } from 'rxjs';
import { NoteResource } from '../models/note-resource';
import { environment } from '../../../environments/environment';
import {EncryptedNotePassword} from "../models/encrypted-note-password";

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly notesUrl = `${environment.apiBaseUrl}/notes`;
  private readonly  options = {
    withCredentials: true
  };

  constructor(private readonly httpClient: HttpClient) {}

  public createNote(note: CreateNoteRequest): Observable<void> {
    return this.httpClient.post<void>(this.notesUrl, note, this.options);
  }

  public getNote(id: string): Observable<NoteResource> {
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.get<NoteResource>(url, this.options);
  }

  public getDecryptedNote(id: string, encryptedNotePassword: EncryptedNotePassword): Observable<NoteResource> {
    const url = `${this.notesUrl}/encrypted/${id}`;
    return this.httpClient.post<NoteResource>(url, encryptedNotePassword, this.options);
  }

  public getNotes(): Observable<NoteResource[]> {
    return this.httpClient.get<NoteResource[]>(this.notesUrl, this.options);
  }

  public deleteNote(id: string): Observable<void> {
    const url = `${this.notesUrl}/${id}`;
    return this.httpClient.delete<void>(url, this.options);
  }
}
