import { User } from '../Models/user';
import { Review } from '../Models/review';

export class Gamer extends User {
    birthAt: Date;
    reviews: Review[];

    constructor() {
        super(); // Appelez le constructeur de la classe de base
        this.birthAt = new Date();
        this.reviews = [];
    }
}