import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaNgclassComponent } from './diretiva-ngclass.component';

describe('DiretivaNgclassComponent', () => {
  let component: DiretivaNgclassComponent;
  let fixture: ComponentFixture<DiretivaNgclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiretivaNgclassComponent]
    });
    fixture = TestBed.createComponent(DiretivaNgclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
