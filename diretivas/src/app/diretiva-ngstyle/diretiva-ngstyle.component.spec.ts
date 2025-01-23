import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaNgstyleComponent } from './diretiva-ngstyle.component';

describe('DiretivaNgstyleComponent', () => {
  let component: DiretivaNgstyleComponent;
  let fixture: ComponentFixture<DiretivaNgstyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretivaNgstyleComponent]
    });
    fixture = TestBed.createComponent(DiretivaNgstyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
