import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarHorariosComponent } from './configurar-horarios.component';

describe('ConfigurarHorariosComponent', () => {
  let component: ConfigurarHorariosComponent;
  let fixture: ComponentFixture<ConfigurarHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarHorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
