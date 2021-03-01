import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMotComponent } from './list-mot.component';

describe('ListMotComponent', () => {
  let component: ListMotComponent;
  let fixture: ComponentFixture<ListMotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
