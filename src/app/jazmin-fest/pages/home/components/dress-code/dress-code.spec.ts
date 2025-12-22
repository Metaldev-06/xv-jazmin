import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressCode } from './dress-code';

describe('DressCode', () => {
  let component: DressCode;
  let fixture: ComponentFixture<DressCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DressCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
