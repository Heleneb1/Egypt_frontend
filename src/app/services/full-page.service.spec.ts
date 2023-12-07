import { TestBed } from '@angular/core/testing';

import { FullPageService } from './full-page.service';

describe('FullPageService', () => {
  let service: FullPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
