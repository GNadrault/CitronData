import { Duree } from './duree.model';

export class Bquery {

    private query: any;
    private ingredients: any;
    private levels: any;
    private durees: any;
    private search: any;
    private filters: any;

    constructor() {
    }

    public queryIngredient(value: string) {
        if (!value) {
            this.ingredients = null;
        } else {
            this.ingredients = {
                'match': {
                    'ingredients.nom': {
                        'query': value,
                        'operator': 'and'
                    }
                }
            };
        }
        this.buildFilter();
        return this;
    }

    public queryLevel(value: number[]) {
        if (value.length == 0) {
            this.levels = null;
        } else {
            this.levels = {
                "terms": {
                    "level": value
                }
            };
        }
        this.buildFilter();
        return this;
    }

    public queryDuree(duree: Duree[]) {
        if (duree.length == 0) {
            this.durees = {
                "bool": {
                    "should": [
                        { "range": { "duree": { "gte": 0, "lte": 100000000 } } }
                    ],
                    "minimum_should_match": 1,
                }
            };
        } else {
            this.durees = {
                "bool": {
                    "should": [this.blabla(duree)],
                    "minimum_should_match": 1,
                }
            };
        }
        return this;
    }

    public blabla(duree: Duree[]): any[] {
        let tab: any[] = [];
        for (let d of duree) {
            let dur = { "range": { "duree": { "gte": d.min, "lte": d.max } } }
            tab.push(dur);
        }
        return tab;
    }

    public buildFilter() {
        if (!this.ingredients) {
            if (!this.levels) {
                this.filters = [];
            } else {
                this.filters = [this.levels]
            }
        } else {
            if (!this.levels) {
                this.filters = [this.ingredients]
            } else {
                this.filters = [this.ingredients, this.levels]
            }
        }
    }

    public querySearch(value: string) {
        if (!value) {
            this.search = null;
        } else {
            this.search =
                [{
                    "match": {
                        "nom": {
                            "query": value,
                            "boost": 3
                        }
                    }
                },
                {
                    "match": {
                        "ingredients.nom": {
                            "query": value,
                            "boost": 2
                        }
                    }
                },
                {
                    "match": {
                        "steps.nom": {
                            "query": value,
                            "boost": 1
                        }
                    }
                }]
        }
        return this;
    }

    public build() {
        if (!this.search) {
            this.query = {
                'query': {
                    'bool': {
                        'must': this.filters,
                        'filter': this.durees,
                    }
                },
                'size':1700,
                "highlight": {
                    "fields": [
                        { "nom": {} },
                        { "ingredients.nom": {} },
                        { "steps.nom": {} }
                    ]
                },
            };
        } else {
            this.query = {
                'query': {
                    'bool': {
                        'must': this.filters,
                        'filter': this.durees,
                        'should': this.search,
                        "minimum_should_match": 1,
                    }
                },
                'size':1700,
                "highlight": {
                    "fields": [
                        { "nom": {} },
                        { "ingredients.nom": {} },
                        { "steps.nom": {} }
                    ]
                },
            };
        }
        return this.query;
    }
}