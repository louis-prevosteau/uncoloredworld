export class Statistique {
    id: number;
    score: number;
    high_score: number;
    tirs: number;
    ennemis_tues: number;
    morts: number;
    bonus: number;
    malus: number;

    constructor(id: number, score: number, high_score: number, tirs: number, ennemis_tues: number, morts: number, bonus: number, malus: number) {
        this.id = id;
        this.score = score;
        this.high_score = high_score;
        this.tirs = tirs;
        this.ennemis_tues = ennemis_tues;
        this.morts = morts;
        this.bonus = bonus;
        this.malus = malus;
    }

    static parse(personne: any) {
        return new Statistique(personne.statistique.id, personne.statistique.score, personne.statistique.high_score, personne.statistique.tirs,
            personne.statistique.ennemis_tues, personne.statistique.morts, personne.statistique.bonus, personne.statistique.malus
        );
    }
}

