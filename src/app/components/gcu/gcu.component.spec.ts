import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestModule } from 'src/app/testing/config'

import { GCUComponent } from './gcu.component';

describe('GCUComponent', () => {
  let component: GCUComponent;
  let fixture: ComponentFixture<GCUComponent>;

  beforeEach(async () => {
    await configureTestModule([GCUComponent]),
      fixture = TestBed.createComponent(GCUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();

  });
});

