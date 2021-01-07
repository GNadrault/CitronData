import { Ingredient } from './ingredient.model';
import { Etape } from './etape.model';

export interface Recette {
    nom: string;
    description: string;
    ingredients: Ingredient[];
    steps: Etape[];
    level: number;
    image: string;
    video: string;
    duree: number;
    personnes: string;
}

export interface RecetteSource {
    _source: Recette;
}