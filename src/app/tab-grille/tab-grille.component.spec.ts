import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGrilleComponent } from './tab-grille.component';

describe('TabGrilleComponent', () => {
  let component: TabGrilleComponent;
  let fixture: ComponentFixture<TabGrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabGrilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
