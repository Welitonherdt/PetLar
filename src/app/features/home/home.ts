import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { map } from "rxjs";
import { AnimaisService } from "../../core/services/animais.service";

@Component({
  selector: "app-home",
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  readonly animaisDestaque$;

  constructor(animaisService: AnimaisService) {
    this.animaisDestaque$ = animaisService
      .getAll()
      .pipe(map((animais) => animais.slice(0, 10)));
  }

  moverCarrossel(trilho: HTMLElement, direcao: number): void {
    trilho.scrollBy({ left: direcao * 340, behavior: "smooth" });
  }
}
