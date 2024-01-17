import { Component } from '@angular/core';
import { TextFormatting } from '../../../core/models/text-formatting';
import { SanitizeHTMLPipe } from '../../../core/pipes/sanitize-html.pipe';
import { TextFormattingSummary } from '../../../core/models/text-formatting-summary';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-text-formatting-help',
  standalone: true,
  imports: [SanitizeHTMLPipe, MatTableModule],
  templateUrl: './text-formatting-help.component.html',
  styleUrl: './text-formatting-help.component.scss',
})
export class TextFormattingHelpComponent {
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
  exampleImageUrl =
    'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/star/default/24px.svg';
  imageExample = `<img src="${this.exampleImageUrl}">`;
  
  linkFormula = `<a href=\"url\">Text</a>`;
  exampleLinkUrl = 'https://google.com';
  linkExample = `<a href="${this.exampleLinkUrl}">Link</a>`;

  textFormattingData: TextFormattingSummary[] = [
    {
      position: 1,
      tagFormula: this.getTextFormattingText('b', 'bold'),
      tagExample: this.getTextFormattingText('b', 'bold'),
    },
    {
      position: 2,
      tagFormula: this.getTextFormattingText('strong', 'strong'),
      tagExample: this.getTextFormattingText('strong', 'strong'),
    },
    {
      position: 3,
      tagFormula: this.getTextFormattingText('i', 'italic'),
      tagExample: this.getTextFormattingText('i', 'italic'),
    },
    {
      position: 3,
      tagFormula: this.getTextFormattingText('em', 'emphasized'),
      tagExample: this.getTextFormattingText('em', 'emphasized'),
    },
    {
      position: 4,
      tagFormula: this.getTextFormattingText('mark', 'marked'),
      tagExample: this.getTextFormattingText('mark', 'marked'),
    },
    {
      position: 5,
      tagFormula: this.getTextFormattingText('small', 'small'),
      tagExample: this.getTextFormattingText('small', 'small'),
    },
    {
      position: 6,
      tagFormula: this.getTextFormattingText('del', 'deleted'),
      tagExample: this.getTextFormattingText('del', 'deleted'),
    },
    {
      position: 7,
      tagFormula: this.getTextFormattingText('ins', 'inserted'),
      tagExample: this.getTextFormattingText('ins', 'inserted'),
    },
    {
      position: 8,
      tagFormula: this.getTextFormattingText('sub', 'subscript'),
      tagExample: this.getTextFormattingText('sub', 'subscript'),
    },
    {
      position: 9,
      tagFormula: this.getTextFormattingText('sup', 'superscript'),
      tagExample: this.getTextFormattingText('sup', 'superscript'),
    },
    {
      position: 10,
      tagFormula: this.getTextFormattingText('h1', 'header1'),
      tagExample: this.getTextFormattingText('h1', 'header1'),
    },
    {
      position: 11,
      tagFormula: this.getTextFormattingText('h2', 'header2'),
      tagExample: this.getTextFormattingText('h2', 'header2'),
    },
    {
      position: 12,
      tagFormula: this.getTextFormattingText('h3', 'header3'),
      tagExample: this.getTextFormattingText('h3', 'header3'),
    },
    {
      position: 13,
      tagFormula: this.getTextFormattingText('h4', 'header4'),
      tagExample: this.getTextFormattingText('h4', 'header4'),
    },
    {
      position: 14,
      tagFormula: this.getTextFormattingText('h5', 'header5'),
      tagExample: this.getTextFormattingText('h5', 'header5'),
    },
    {
      position: 15,
      tagFormula: this.getTextFormattingText('h6', 'header6'),
      tagExample: this.getTextFormattingText('h6', 'header6'),
    },
    {
      position: 16,
      tagFormula: this.imageFormula,
      tagExample: this.imageExample,
    },
    {
      position: 17,
      tagFormula: this.linkFormula,
      tagExample: this.linkExample,
    },
  ];

  displayedColumns: string[] = ['position', 'tagFormula', 'tagExample'];

  protected getTextFormattingText(tag: string, content: string) {
    return `<${tag}> ${content} </${tag}>`;
  }
}
