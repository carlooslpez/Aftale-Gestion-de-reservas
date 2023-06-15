import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AftaleTopMenuComponent } from './aftale-top-menu.component';

describe('AftaleTopMenuComponent', () => {
  let component: AftaleTopMenuComponent;
  let fixture: ComponentFixture<AftaleTopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AftaleTopMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AftaleTopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
