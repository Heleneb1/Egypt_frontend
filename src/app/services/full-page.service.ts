import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullPageService {

  constructor () { }
  private imageUrlSubject = new BehaviorSubject<string | null>(null);

  setImageUrl(imageUrl: string): void {
    this.imageUrlSubject.next(imageUrl);
  }

  getImageUrl(): BehaviorSubject<string | null> {
    return this.imageUrlSubject;
  }
}
