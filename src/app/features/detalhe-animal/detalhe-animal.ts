import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from "rxjs";
import { AnimaisService } from "../../core/services/animais.service";

@Component({
  selector: "app-detalhe-animal",
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./detalhe-animal.html",
  styleUrl: "./detalhe-animal.css",
})
export class DetalheAnimal {
  readonly animal$;

  constructor(route: ActivatedRoute, animaisService: AnimaisService) {
    this.animal$ = route.paramMap.pipe(
      map((parametros) => parametros.get("id") ?? ""),
      switchMap((id) => animaisService.getById(id)),
    );
  }
}
