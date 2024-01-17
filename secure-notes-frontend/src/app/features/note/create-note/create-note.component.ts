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
  ],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.scss',
})
export class CreateNoteComponent implements OnInit {
  protected noteForm!: FormGroup;
  protected errorMatcher = new ErrorStateMatcher();

  textFormattingArray: TextFormatting[] = [
    new TextFormatting('b', 'bold'),
    new TextFormatting('strong', 'strong'),
    new TextFormatting('i', 'italic'),
    new TextFormatting('em', 'emphasized'),
    new TextFormatting('mark', 'marked'),
    new TextFormatting('small', 'small'),
    new TextFormatting('del', 'deleted'),
    new TextFormatting('ins', 'inserted'),
    new TextFormatting('sub', 'subscript'),
    new TextFormatting('sup', 'superscript'),
    new TextFormatting('h1', 'header1'),
    new TextFormatting('h2', 'header2'),
    new TextFormatting('h3', 'header3'),
    new TextFormatting('h4', 'header4'),
    new TextFormatting('h5', 'header5'),
    new TextFormatting('h6', 'header6'),
  ];

  imageFormula = `<img src=\"url\">`;
  exampleImageUrl = 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/star/default/24px.svg';
  imageExample = `<img src="${this.exampleImageUrl}">`;
  linkFormula = `<a href=\"text\">Link</a>`;
  exampleLinkUrl = 'https://google.com';
  linkExample = `<a href="${this.exampleLinkUrl}">Link</a>`;

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

  protected getTextFormattingText(textFormatting: TextFormatting) {
    return `<${textFormatting.tag}> ${textFormatting.content} </${textFormatting.tag}>`;
  }

  protected createNote(): void {
    const createNoteRequest = new CreateNoteRequest(
      this.titleFormControl.value,
      this.contentFormControl.value,
      'user'
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
