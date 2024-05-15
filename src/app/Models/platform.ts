import { Game } from '../Models/game';

export class Platform {
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