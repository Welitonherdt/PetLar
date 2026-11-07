import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheAnimal } from './detalhe-animal';
import { of } from 'rxjs';
import { AnimaisService } from '../../core/services/animais.service';

describe('DetalheAnimal', () => {
  let component: DetalheAnimal;
  let fixture: ComponentFixture<DetalheAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AnimaisService, useValue: { getById: () => of(undefined) } }],
      imports: [DetalheAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
