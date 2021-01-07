import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';

@Injectable()
export class ElasticsearchService {

  private elasticClient: Client;

  constructor() {
    if (!this.elasticClient) {
      this.connect();
    }
  }

  private connect() {
    this.elasticClient = new Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }

  private queryalldocs = {
    'query': {
      'match_all': {}
    },
    'size':1700
  };

  getNumDocuments(_index, _type): any {
    return this.elasticClient.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,
      filterPath: ['hits.total']
    });
  }

  getAllDocuments(_index, _type): any {
    return this.elasticClient.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id','highlight']
    });
  }

  getDocumentsByQuery(_index, _type, query): any {
    return this.elasticClient.search({
      index: _index,
      type: _type,
      body: query,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id','aggregations']
    });
  }

  getNumByAgg(_index, _type, agg): any {
    return this.elasticClient.search({
      index: _index,
      type: _type,
      body: agg,
      filterPath: ['aggregations']
    });
  }
}
