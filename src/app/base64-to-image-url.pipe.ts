import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'base64ToImageUrl'
})
export class Base64ToImageUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(base64Image: string, contentType: string): SafeUrl {
    const imageUrl = `data:${contentType};base64,${base64Image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
