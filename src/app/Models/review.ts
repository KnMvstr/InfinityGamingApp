import { Gamer } from '../Models/gamer';
import { Moderator } from '../Models/moderator';
import { Game } from '../Models/game';

export class Review {
    id: number;
    description: string;
    createdAt: Date;
    rating: number;
    image: string;
    gamer: Gamer;
    game: Game;
    moderator: Moderator

    constructor() {
        this.id = 0;
        this.description = "";
        this.createdAt = new Date();
        this.rating = 0;
        this.image = "";
        this.gamer = new Gamer();
        this.game = new Game();
        this.moderator = new Moderator();
    }
}