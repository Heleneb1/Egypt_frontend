import { TestBed } from '@angular/core/testing';
import { CommentsService } from './comments.service';
import { configureTestModule } from 'src/app/testing/config';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
