import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ElasticsearchService } from '../../domain/service/elasticsearch.service';
import { CommandeSource, Commande } from '../../domain/model/commande.model';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'ngx-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})

export class CommandesComponent implements OnInit {

  private static readonly INDEX_COM = 'ind-comm-cours';
  private static readonly TYPE = '_doc';
  commandeSources: CommandeSource[];
  sub: Subscription;
  commandes: Commande[] = [];
  first = true;
  source: LocalDataSource = new LocalDataSource();

  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      datecreation: {
        title: 'Date création',
        type: Date,
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe("en-GB").transform(date, 'dd/MM/yyyy hh:mm');
          }
          return null;
        },
        sort: true
      },
      nom_ville: {
        title: 'Ville',
        type: 'string',
      },
      prixtotal: {
        title: 'Prix €',
        type: 'string',
      }
    }
  };

  private queryAllCommandes = {
    "query": {
      "match_all": {}
    },
    "sort": [{ "datecreation": "desc" }, { "id": "desc" }],
    'size': 76
  };

  constructor(private es: ElasticsearchService) {
  }

  ngOnInit() {
    this.updateCommandes();
    this.sub = Observable.interval(1000).subscribe((val) => {
      this.updateCommandes();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateCommandes() {
    this.es.getDocumentsByQuery(CommandesComponent.INDEX_COM, CommandesComponent.TYPE, this.queryAllCommandes)
      .then(response => {
        this.commandeSources = response.hits.hits;
        this.loadCommandes(this.commandeSources);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Commandes Completed!');
      });
  }

  loadCommandes(cmdS: CommandeSource[]) {
    if (this.first) {
      this.commandes = [];
    }
    for (let s of cmdS) {
      let c = this.commandes;
      if (!this.commandes.some((item) => item.id === s._source.id)) {
        this.commandes.push(s._source);
        if (!this.first) {
          this.source.update(c, this.commandes);
          this.source.refresh();
        }
      }
    }
    if (this.first) {
      this.source.load(this.commandes);
      this.first = false;
    }
  }
}
