export interface Commande {
    id: number;
    datecreation: Date;
    nom_ville: string;
    prixtotal: number;
}

export interface CommandeSource {
    _source: Commande;
}