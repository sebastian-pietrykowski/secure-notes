import { SanitizeTextStylePipe } from './sanitize-text-style.pipe';

describe('SanitizeTextStylePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeTextStylePipe();
    expect(pipe).toBeTruthy();
  });
});
