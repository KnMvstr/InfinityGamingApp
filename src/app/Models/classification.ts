import { Game } from '../Models/game';

export class Classification {
    id: number;
    name: string;
    description: string;
    image: string;
    slug: string;
    games: Game[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.image = "";
        this.slug = "";
        this.games = [];
    }
}