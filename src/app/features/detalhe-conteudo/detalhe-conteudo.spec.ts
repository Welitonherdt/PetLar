import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheConteudo } from './detalhe-conteudo';

describe('DetalheConteudo', () => {
  let component: DetalheConteudo;
  let fixture: ComponentFixture<DetalheConteudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
