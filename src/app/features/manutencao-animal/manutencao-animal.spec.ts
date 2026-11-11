import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoAnimal } from './manutencao-animal';
import { EMPTY, of } from 'rxjs';
import { AnimaisService } from '../../core/services/animais.service';
import { Animal } from '../../core/models/animal.model';

describe('ManutencaoAnimal', () => {
  let component: ManutencaoAnimal;
  let fixture: ComponentFixture<ManutencaoAnimal>;
  const animal: Animal = {
    id: 'luna',
    nome: 'Luna',
    especie: 'Cachorro',
    raca: 'Sem raça definida',
    idadeMeses: 12,
    porte: 'Médio',
    descricao: 'Uma companheira carinhosa.',
    disponivel: false,
  };
  let service: {
    getById: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
  let route: {
    snapshot: {
      queryParamMap: ReturnType<typeof convertToParamMap>;
      paramMap: ReturnType<typeof convertToParamMap>;
    };
  };

  beforeEach(async () => {
    service = {
      getById: vi.fn(() => of(animal)),
      create: vi.fn(() => EMPTY),
      update: vi.fn(() => EMPTY),
    };
    route = { snapshot: { queryParamMap: convertToParamMap({}), paramMap: convertToParamMap({}) } };
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AnimaisService, useValue: service },
        { provide: ActivatedRoute, useValue: route },
      ],
      imports: [ManutencaoAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('envia os campos do formulário com idade numérica e disponibilidade booleana', () => {
    fixture.detectChanges();
    const preencher = (campo: string, valor: string) => {
      const input = fixture.nativeElement.querySelector(
        `[formControlName="${campo}"]`,
      ) as HTMLInputElement;
      input.value = valor;
      input.dispatchEvent(new Event('input'));
    };
    preencher('nome', animal.nome);
    preencher('especie', animal.especie);
    preencher('raca', animal.raca);
    preencher('idadeMeses', '12');
    preencher('porte', animal.porte);
    preencher('descricao', animal.descricao);
    const checkbox = fixture.nativeElement.querySelector('#disponivel') as HTMLInputElement;
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { cancelable: true }));
    const { id, ...dados } = animal;
    expect(service.create).toHaveBeenCalledWith(dados);
    expect(service.update).not.toHaveBeenCalled();
  });

  it.each([-1, 1.5])('impede cadastro com idade inválida: %s', (idadeMeses) => {
    component.form.patchValue({ ...animal, idadeMeses });
    component.submit();
    expect(service.create).not.toHaveBeenCalled();
    expect(component.form.controls.idadeMeses.invalid).toBe(true);
  });

  it('carrega e atualiza o animal usando o identificador no caminho da rota', () => {
    route.snapshot.paramMap = convertToParamMap({ id: animal.id });
    component.ngOnInit();
    expect(service.getById).toHaveBeenCalledWith(animal.id);
    expect(component.loadingData).toBe(false);
    component.submit();
    const { id, ...dados } = animal;
    expect(service.update).toHaveBeenCalledWith(id, dados);
    expect(service.create).not.toHaveBeenCalled();
  });
});
