import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JazminFest } from './jazmin-fest';

describe('JazminFest', () => {
  let component: JazminFest;
  let fixture: ComponentFixture<JazminFest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JazminFest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JazminFest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
