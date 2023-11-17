import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageImageComponent } from './full-page-image.component';

describe('FullPageImageComponent', () => {
  let component: FullPageImageComponent;
  let fixture: ComponentFixture<FullPageImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullPageImageComponent]
    });
    fixture = TestBed.createComponent(FullPageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
