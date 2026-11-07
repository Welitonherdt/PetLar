import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home").then((m) => m.Home),
    title: "Início | PetLar",
  },
  {
    path: "sobre",
    loadComponent: () => import("./features/sobre/sobre").then((m) => m.Sobre),
    title: "Sobre | PetLar",
  },
  {
    path: "animais",
    loadComponent: () =>
      import("./features/animal/animal").then((m) => m.Animal),
    title: "Animais | PetLar",
  },
  {
    path: "animais/:id",
    loadComponent: () =>
      import("./features/detalhe-animal/detalhe-animal").then(
        (m) => m.DetalheAnimal,
      ),
    title: "Detalhes do animal | PetLar",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | PetLar",
  },
  {
    path: "admin/form",
    loadComponent: () =>
      import("./features/manutencao-animal/manutencao-animal").then(
        (m) => m.ManutencaoAnimal,
      ),
    title: "Novo animal | PetLar",
  },
  {
    path: "admin/form/:id",
    loadComponent: () =>
      import("./features/manutencao-animal/manutencao-animal").then(
        (m) => m.ManutencaoAnimal,
      ),
    title: "Editar animal | PetLar",
  },
  { path: "**", redirectTo: "" },
];
