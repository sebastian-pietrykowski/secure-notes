import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SanitizeHTMLPipe } from '../../../core/pipes/sanitize-html.pipe';
import { NoteResource } from '../../../core/models/note-resource';
import { NoteService } from '../../../core/services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EncryptedNotePassword } from '../../../core/models/encrypted-note-password';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-show-note',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    SanitizeHTMLPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './show-note.component.html',
  styleUrl: './show-note.component.scss',
})
export class ShowNoteComponent implements OnInit {
  protected note!: NoteResource;
  private id!: string;
  protected passwordForm!: FormGroup;

  constructor(
    private readonly noteService: NoteService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.createPasswordForm();
    const note$ = this.noteService.getNote(this.id);
    note$.subscribe({
      next: (note: NoteResource) => {
        this.note = note;
      }
    });
  }

  protected deleteNote(id: string) {
    const delete$ = this.noteService.deleteNote(id);
    delete$.subscribe({
      next: () => {
        this.goToNoteListPage();
      },
    });
  }

  private goToNoteListPage(): void {
    this.router.navigateByUrl('/notes').then();
  }

  private createPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  protected get passwordFormControl(): FormControl {
    return this.passwordForm.get('password') as FormControl;
  }

  protected encryptPassword() {
    const encryptedNotePassword = new EncryptedNotePassword(
      this.passwordFormControl.value,
    );
    const decryptedNote$ = this.noteService.getDecryptedNote(
      this.id,
      encryptedNotePassword,
    );
    decryptedNote$.subscribe({
      next: (note: NoteResource) => {
        this.note = note;
      },
      error: (err) => {
        this.snackBar.open('Invalid password', 'Close');
      }
    })
  }
}
