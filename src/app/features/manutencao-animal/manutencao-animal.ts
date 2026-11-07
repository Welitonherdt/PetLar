import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AnimaisService } from "../../core/services/animais.service";
@Component({
  selector: "app-manutencao-animal",
  imports: [RouterLink],
  templateUrl: "./manutencao-animal.html",
  styleUrl: "./manutencao-animal.css",
})
export class ManutencaoAnimal {
  private fb = inject(FormBuilder);
  private animaisService = inject(AnimaisService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = "";
  errorMessage = "";

  form = this.fb.nonNullable.group({
  nome: ["", [Validators.required]],
  especie: ["", [Validators.required]],
  raca: ["", [Validators.required]],
  idadeMeses: [0, [Validators.required]],
  porte: ["", [Validators.required]],
  descricao: ["", [Validators.required]],
  disponivel: [true, [Validators.required]],

  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get("id");
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
          disponivel: animal.disponivel
    });
       this.loadingData = false;
        },
        error: (error) => {
          this.errorMessage = "Erro ao carregar a barraca." + error.message;
          this.loadingData = false;
      }
    });
  }
  submit(): void {
    this.successMessage = "";
    this.errorMessage = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    const animalData = {
      raca: formValue.raca,
    };
    if (this.editingId !== null) {

    }
  }

}
