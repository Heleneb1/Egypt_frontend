import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], });
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    const pipe = new SafePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
