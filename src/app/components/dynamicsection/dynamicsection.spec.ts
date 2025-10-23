import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dynamicsection } from './dynamicsection';

describe('Dynamicsection', () => {
  let component: Dynamicsection;
  let fixture: ComponentFixture<Dynamicsection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dynamicsection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dynamicsection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
