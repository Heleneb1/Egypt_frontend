import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { configureTestModule } from 'src/app/testing/config';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    await configureTestModule();
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
