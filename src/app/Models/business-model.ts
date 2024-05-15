import { Game } from '../Models/game';

export class BusinessModel {
    id: number;
    name: string;
    slug: string;
    games: Game[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.slug = "";
        this.games = [];
    }
}