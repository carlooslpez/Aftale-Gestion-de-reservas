import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarServiciosComponent } from './configurar-servicios.component';

describe('ConfigurarServiciosComponent', () => {
  let component: ConfigurarServiciosComponent;
  let fixture: ComponentFixture<ConfigurarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
