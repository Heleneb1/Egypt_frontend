import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';
import { configureTestModule } from 'src/app/testing/config';

describe('AuthGuardService', () => {
  let service: AuthGuard;

  beforeEach(async () => {
    configureTestModule([], [AuthGuard]);
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
