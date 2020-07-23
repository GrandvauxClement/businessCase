import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionslegaleComponent } from './mentionslegale.component';

describe('MentionslegaleComponent', () => {
  let component: MentionslegaleComponent;
  let fixture: ComponentFixture<MentionslegaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionslegaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionslegaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
