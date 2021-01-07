import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recette } from '../model/recette.model';
import { Observable } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';

const httpOptions = {
  headers : new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class RecetteService {

  private _url_wsrecette: string = 'http://localhost:3000/products';
  private _url_citron: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  findAllRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this._url_wsrecette);
  }

  findRecetteById(id: string): Observable<Recette> {
    return this.http.get<Recette>(this._url_wsrecette + "/" + id);
  }

  findAllIngredientsPanier() : Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this._url_citron);
  }

  findAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this._url_citron);
  }
}
