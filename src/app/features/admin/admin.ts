import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Animal } from '../../core/models/animal.model';
import { AnimaisService } from '../../core/services/animais.service';
@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private animalService = inject(AnimaisService);
  private router = inject(Router);

  animais = signal<Animal[]>([]);
  loading = signal(true);
  errorMessage = '';
  sucessMessage = '';

  loadAnimal(): void {
    this.loading.set (true);
    this.errorMessage = '';
    this.animalService.getAll().subscribe({
      next: (response) => {
        this.animais.set(response);
        this.loading.set (false);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar animais';
        this.loading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadAnimal();
  }

  edit(id: string): void {
    this.router.navigate(['/admin/form'], {
      queryParams: { id },
    });
  }

  remove(id: string): void {
    const confirmDelete = confirm('Está certo disso?');
    if (!confirmDelete) {
      return;
    }

    this.animalService.delete(id).subscribe({
      next: () => {
        this.sucessMessage = 'Animal removido com sucesso!';
        this.loadAnimal();
        setTimeout(() => {
          this.sucessMessage = '';
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Erro ao remover animal.';
      },
    });
  }
}
