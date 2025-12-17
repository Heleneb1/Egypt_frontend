import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { UserInfoComponent } from './user-info.component';


describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await configureTestModule([UserInfoComponent]);

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;

    component.user = {
      badgesIds: [],
      username: '',
      email: '',
      roles: []
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
