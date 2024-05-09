import { Base64ToImageUrlPipe } from './base64-to-image-url.pipe';

describe('Base64ToImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new Base64ToImageUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
