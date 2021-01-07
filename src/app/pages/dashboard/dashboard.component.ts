import { Component, OnDestroy } from '@angular/core';
import { Stat } from '../../domain/model/stat.model';
import { ElasticsearchService } from '../../domain/service/elasticsearch.service';
import { UserService } from '../../domain/service/user.service';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private graphnum = 4;
  sub: Subscription;

  statInscriptions: Stat = {
    name: 'INSCRIPTIONS',
    value: '30',
    unite: '',
    icon: 'ion-android-people',
    color: '#288dd0',
    graph: 4
  };
  statCommandes: Stat = {
    name: 'COMMANDES',
    value: '800',
    unite: '',
    icon: 'ion-bag',
    color: '#cc2a36',
    graph: 3
  };
  statArticles: Stat = {
    name: 'ARTICLES',
    value: '100',
    unite: '',
    icon: 'ion-android-restaurant',
    color: '#41A55F',
    graph: 1
  };
  statChiffreAffaire: Stat = {
    name: 'CHIFFRE AFFAIRE',
    value: '125 000',
    unite: '€',
    icon: 'ion-cash',
    color: '#ffcb17',
    graph: 2
  };

  constructor(private es: ElasticsearchService, private us: UserService) {
  }

  ngOnInit() {
    this.us.setUserClient(false);
    this.updateCompteurs();
    this.sub = Observable.interval(1000).subscribe((val) => {
      this.updateCompteurs();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onGraphChange(event) {
    this.graphnum = event;
  }

  updateCompteurs() {
    this.es.getNumByAgg('article', '_doc', this.queryAllArticle)
      .then(response => {
        this.statArticles.value = response.aggregations.count.value;
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
    this.es.getNumDocuments('ind-info-com', '_doc')
      .then(response => {
        this.statCommandes.value = response.hits.total.value;
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
    this.es.getNumDocuments('inscrit', '_doc')
      .then(response => {
        this.statInscriptions.value = response.hits.total.value;
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
      this.es.getNumByAgg('ind-info-com', '_doc', this.queryCA)
      .then(response => {
        this.statChiffreAffaire.value = response.aggregations.prix.value.toFixed(0);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Recipe Completed!');
      });
  }

  private queryAllArticle = {
    "size": 0,
    "aggs": {
      "count": {
        "cardinality": {
          "field": "nom.keyword"
        }
      }
    }
  }

  private queryCA = {
    "size": 0,
    "aggs": {
      "prix": {
        "sum": {
          "field": "prixtotal"
        }
      }
    }
  }
}
