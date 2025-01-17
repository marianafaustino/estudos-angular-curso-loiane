import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteStyleComponent } from './teste-style.component';

describe('TesteStyleComponent', () => {
  let component: TesteStyleComponent;
  let fixture: ComponentFixture<TesteStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesteStyleComponent]
    });
    fixture = TestBed.createComponent(TesteStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
