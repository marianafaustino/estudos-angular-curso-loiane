import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploNgContentComponent } from './exemplo-ng-content.component';

describe('ExemploNgContentComponent', () => {
  let component: ExemploNgContentComponent;
  let fixture: ComponentFixture<ExemploNgContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExemploNgContentComponent]
    });
    fixture = TestBed.createComponent(ExemploNgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
