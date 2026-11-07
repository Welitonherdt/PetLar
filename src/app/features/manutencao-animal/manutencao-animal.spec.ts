import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoAnimal } from './manutencao-animal';

describe('ManutencaoAnimal', () => {
  let component: ManutencaoAnimal;
  let fixture: ComponentFixture<ManutencaoAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [ManutencaoAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoAnimal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
