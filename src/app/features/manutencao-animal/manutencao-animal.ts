import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimaisService } from '../../core/services/animais.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Animal } from '../../core/models/animal.model';
@Component({
  selector: 'app-manutencao-animal',
  imports: [ReactiveFormsModule],
  templateUrl: './manutencao-animal.html',
  styleUrl: './manutencao-animal.css',
})
export class ManutencaoAnimal {
  private fb = inject(FormBuilder);
  private animaisService = inject(AnimaisService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required]],
    especie: ['', [Validators.required]],
    raca: ['', [Validators.required]],
    idadeMeses: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    porte: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    disponivel: [true],
  });

  ngOnInit(): void {
    const id =
      this.route.snapshot.queryParamMap.get('id') ?? this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = id;
      this.loadAnimal(id);
    }
  }

  loadAnimal(id: string): void {
    this.loadingData = true;
    this.animaisService.getById(id).subscribe({
      next: (animal) => {
        this.form.patchValue({
          nome: animal.nome,
          especie: animal.especie,
          raca: animal.raca,
          idadeMeses: animal.idadeMeses,
          porte: animal.porte,
          descricao: animal.descricao,
          disponivel: animal.disponivel,
        });
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar o animal. ' + error.message;
        this.loadingData = false;
      },
    });
  }
  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.loading || this.loadingData) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const animalData: Omit<Animal, 'id'> = this.form.getRawValue();
    if (this.editingId !== null) {
      this.animaisService.update(this.editingId, animalData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Animal atualizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1000);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erro ao atualizar animal.';
        },
      });
      return;
    }
    this.animaisService.create(animalData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Animal criado com sucesso!';
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao criar animal.';
      },
    });
  }
}
