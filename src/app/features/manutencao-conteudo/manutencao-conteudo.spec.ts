import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoConteudo } from './manutencao-conteudo';

describe('ManutencaoConteudo', () => {
  let component: ManutencaoConteudo;
  let fixture: ComponentFixture<ManutencaoConteudo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [ManutencaoConteudo],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoConteudo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
