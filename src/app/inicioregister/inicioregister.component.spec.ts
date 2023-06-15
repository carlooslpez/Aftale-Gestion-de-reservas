import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioregisterComponent } from './inicioregister.component';

describe('InicioregisterComponent', () => {
  let component: InicioregisterComponent;
  let fixture: ComponentFixture<InicioregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
