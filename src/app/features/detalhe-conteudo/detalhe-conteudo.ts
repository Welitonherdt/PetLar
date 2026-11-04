import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from "rxjs";
import { AnimaisService } from "../../core/services/animais.service";

@Component({
  selector: "app-detalhe-conteudo",
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./detalhe-conteudo.html",
  styleUrl: "./detalhe-conteudo.css",
})
export class DetalheConteudo {
  readonly animal$;

  constructor(route: ActivatedRoute, animaisService: AnimaisService) {
    this.animal$ = route.paramMap.pipe(
      map((parametros) => parametros.get("id") ?? ""),
      switchMap((id) => animaisService.getById(id)),
    );
  }
}
