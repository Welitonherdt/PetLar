import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheConteudo } from './detalhe-conteudo';
import { of } from 'rxjs';
import { AnimaisService } from '../../core/services/animais.service';

describe('DetalheConteudo', () => {
  let component: DetalheConteudo;
  let fixture: ComponentFixture<DetalheConteudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AnimaisService, useValue: { getById: () => of(undefined) } }],
      imports: [DetalheConteudo],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheConteudo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
