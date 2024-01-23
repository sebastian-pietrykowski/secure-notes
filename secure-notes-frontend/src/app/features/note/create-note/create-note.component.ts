import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SanitizeHTMLPipe } from '../../../core/pipes/sanitize-html.pipe';
import { TextFormatting } from '../../../core/models/text-formatting';
import {CreateNoteRequest} from "../../../core/models/create-note-request";
import {TextFormattingHelpComponent} from "../text-formatting-help/text-formatting-help.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SanitizeHTMLPipe,
    TextFormattingHelpComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss',
})
export class CreateNoteComponent implements OnInit {
  protected noteForm!: FormGroup;
  protected errorMatcher = new ErrorStateMatcher();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.createNoteForm();
  }

  protected get titleFormControl(): FormControl {
    return this.noteForm!.get('title') as FormControl;
  }

  protected get contentFormControl(): FormControl {
    return this.noteForm!.get('content') as FormControl;
  }

  protected get isEncryptedFormControl(): FormControl {
    return this.noteForm!.get('isEncrypted') as FormControl;
  }

  protected get passwordFormControl(): FormControl {
    return this.noteForm!.get('password') as FormControl;
  }

  protected createNote(): void {
    const createNoteRequest = new CreateNoteRequest(
      this.titleFormControl.value,
      this.contentFormControl.value,
      'user',
      this.isEncryptedFormControl.value,
      this.passwordFormControl.value
    );
    console.log(createNoteRequest);
  }

  private createNoteForm(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      isEncrypted: [''],
      password: [''],
    });
  }
}
