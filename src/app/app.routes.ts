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
    path: "conteudos",
    loadComponent: () =>
      import("./features/conteudos/conteudos").then((m) => m.Conteudos),
    title: "Animais | PetLar",
  },
  {
    path: "conteudos/:id",
    loadComponent: () =>
      import("./features/detalhe-conteudo/detalhe-conteudo").then(
        (m) => m.DetalheConteudo,
      ),
    title: "Detalhes do animal | PetLar",
  },
  {
    path: "admin",
    loadComponent: () => import("./features/admin/admin").then((m) => m.Admin),
    title: "Admin | PetLar",
  },
  {
    path: "admin/novo",
    loadComponent: () =>
      import("./features/manutencao-conteudo/manutencao-conteudo").then(
        (m) => m.ManutencaoConteudo,
      ),
    title: "Novo animal | PetLar",
  },
  {
    path: "admin/editar/:id",
    loadComponent: () =>
      import("./features/manutencao-conteudo/manutencao-conteudo").then(
        (m) => m.ManutencaoConteudo,
      ),
    title: "Editar animal | PetLar",
  },
  { path: "**", redirectTo: "" },
];
