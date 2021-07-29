import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassignedComponent } from './viewassigned.component';

describe('ViewassignedComponent', () => {
  let component: ViewassignedComponent;
  let fixture: ComponentFixture<ViewassignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewassignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewassignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
