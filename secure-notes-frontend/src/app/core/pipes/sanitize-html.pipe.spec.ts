import { SanitizeHTMLPipe } from './sanitize-html.pipe';

describe('SanitizeTextStylePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeHTMLPipe();
    expect(pipe).toBeTruthy();
  });
});
