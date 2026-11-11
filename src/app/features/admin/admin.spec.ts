import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admin } from './admin';
import { of } from 'rxjs';
import { AnimaisService } from '../../core/services/animais.service';
import { Animal } from '../../core/models/animal.model';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;
  const animal: Animal = {
    id: 'luna',
    nome: 'Luna',
    especie: 'Cachorro',
    raca: 'Sem raça definida',
    idadeMeses: 12,
    porte: 'Médio',
    descricao: 'Uma companheira carinhosa.',
    disponivel: true,
  };
  let service: { getAll: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    service = { getAll: vi.fn(() => of([animal])), delete: vi.fn(() => of(undefined)) };
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AnimaisService, useValue: service }],
      imports: [Admin],
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => vi.restoreAllMocks());

  it('carrega os animais ao abrir a administração', () => {
    fixture.detectChanges();
    expect(service.getAll).toHaveBeenCalledOnce();
    expect(component.animais).toEqual([animal]);
    expect(component.loading).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Luna');
  });

  it('não exclui o animal quando a confirmação é cancelada', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.remove(animal.id);
    expect(service.delete).not.toHaveBeenCalled();
  });
});
