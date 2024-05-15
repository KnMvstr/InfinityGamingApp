import { Genre } from "../Models/genre";
import { Publisher } from "../Models/publisher";
import { BusinessModel } from "../Models/business-model";
import { Moderator } from "../Models/moderator";
import { Classification } from "../Models/classification";
import { Platform } from "../Models/platform";
import { Review } from "../Models/review";

export class Game {
    id: number;
    name: string;
    description: string;
    releaseDate: Date;
    image: string;
    backgroundImage: string;
    trailer: string;
    slug: string;
    genre: Genre;
    publisher: Publisher;
    businessModel: BusinessModel;
    moderator: Moderator;
    classification: Classification;
    platforms: Platform[];
    reviews: Review[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.releaseDate = new Date();
        this.image = "";
        this.backgroundImage = "";
        this.trailer = "";
        this.slug = "";
        this.genre = new Genre();
        this.publisher = new Publisher();
        this.businessModel = new BusinessModel();
        this.moderator = new Moderator();
        this.classification = new Classification();
        this.platforms = [];
        this.reviews = [];
    }
}
