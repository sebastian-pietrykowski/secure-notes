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

  protected createNote(): void {
    const createNoteRequest = new CreateNoteRequest(
      this.titleFormControl.value,
      this.contentFormControl.value,
      'user',
    );
    console.log(createNoteRequest);
  }

  private createNoteForm(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
}
