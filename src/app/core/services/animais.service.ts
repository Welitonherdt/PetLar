import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Animal } from "../models/animal.model";
import { HttpClient } from "@angular/common/http";

type FirebaseAnimal = Omit<Animal, "id"> & { id?: unknown};

@Injectable({ providedIn: "root" })
export class AnimaisService {
  private http = inject(HttpClient);
  private apiUrl = "https://petlar-3b087-default-rtdb.firebaseio.com/Animal";
  private sufix = ".json"


  getAll(): Observable<Animal[]> {
    return this.http
    .get<Record<string, FirebaseAnimal> | null>(this.apiUrl + this.sufix).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([id, animal]) => {
          const { id: _ignoredId, ...animalData } = animal;
          return { id, ...animalData };
        });

      }),
      );
    }

    getById(id: string): Observable<Animal> {
      return this.http.get<FirebaseAnimal | null>
      (`${this.apiUrl}/${id}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error("Animal não encontrado!");
          }
          const { id: _ignoredId, ...animalData } = response;
          return { id, ...animalData};
        }),
      );
    }

    delete(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
    }
  }



