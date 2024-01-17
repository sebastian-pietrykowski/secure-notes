import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHTML',
  standalone: true,
})
export class SanitizeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): unknown {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
