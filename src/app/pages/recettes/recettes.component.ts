import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../domain/service/elasticsearch.service';
import { RecetteSource } from '../../domain/model/recette.model';
import { Bucket } from '../../domain/model/bucket.model';
import { Bquery } from '../../domain/model/bquery.model';
import { Duree } from '../../domain/model/duree.model';
import { UserService } from '../../domain/service/user.service';

@Component({
  selector: 'ngx-recettes',
  styleUrls: ['./recettes.component.scss'],
  templateUrl: './recettes.component.html',
})
export class RecettesComponent implements OnInit {

  private static readonly INDEX_REC = 'recette';
  private static readonly TYPE = '_doc';

  ingredientSource: Bucket[];
  ingredients: String[];
  ingredientsChoose: String[];
  recetteSources: RecetteSource[];
  numRecette: number;

  ingredientSelected: string;
  levelSelected: number[] = [];
  searchRecette: string;
  dureeSelected: Duree[] = [];

  difficulte = {
    marmiton: false,
    chef: false,
    topchef: false,
  };

  duree = {
    zero: false,
    dix: false,
    trente: false,
    heure: false
  };
  
  constructor(private es: ElasticsearchService, private us: UserService) {
  }

  ngOnInit() {
    this.us.setUserClient(true);
    this.es.getAllDocuments(RecettesComponent.INDEX_REC, RecettesComponent.TYPE)
      .then(response => {
        this.recetteSources = response.hits.hits;
        this.numRecette = response.hits.total;
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
    this.es.getDocumentsByQuery('article', '_doc', this.queryAllArticles)
      .then(response => {
        console.log(response);
        this.ingredientSource = response.aggregations.group_by_state.buckets;
        this.loadIngredients(this.ingredientSource);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
  }

  loadIngredients(ingS: Bucket[]) {
    this.ingredients = [];
    for (let s of ingS) {
      this.ingredients.push(s.key);
    }
  }

  onFilterIngredientChange(event) {
    this.ingredientsChoose = event;
    this.ingredientSelected = '';
    for (let ing of this.ingredientsChoose) {
      this.ingredientSelected += ing + ' ';
    }
    this.onQuery();
  }

  onQuery() {
    let queryBuilder = new Bquery();
    let query = queryBuilder.querySearch(this.searchRecette).queryIngredient(this.ingredientSelected).queryLevel(this.levelSelected).queryDuree(this.dureeSelected).build();
    this.es.getDocumentsByQuery(RecettesComponent.INDEX_REC, RecettesComponent.TYPE, query)
      .then(response => {
        this.recetteSources = response.hits.hits;
        this.numRecette = response.hits.total;
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
  }

  onFilterLevelChange() {
    this.levelSelected = [];
    if (this.difficulte.marmiton) {
      this.levelSelected.push(0);
      this.levelSelected.push(1);
    }
    if (this.difficulte.chef) {
      this.levelSelected.push(2);
    }
    if (this.difficulte.topchef) {
      this.levelSelected.push(3);
    }
    this.onQuery();
  }

  onFilterDureeChange() {
    this.dureeSelected = [];
    if (this.duree.zero) {
      let d = new Duree(0,10);
      this.dureeSelected.push(d);
    }
    if (this.duree.dix) {
      let d = new Duree(10,30);
      this.dureeSelected.push(d);
    }
    if (this.duree.trente) {
      let d = new Duree(30,60);
      this.dureeSelected.push(d);
    }
    if (this.duree.heure) {
      let d = new Duree(60,10000000);
      this.dureeSelected.push(d);
    }
    this.onQuery();
  }

  onSearchClick() {
    this.onQuery();
  }

  private queryAllArticles = {
    "size": 0,
    "aggs": {
      "group_by_state": {
        "terms": {
          "field": "nom.keyword",
          "size": 100
        }
      }
    }
  };
};
