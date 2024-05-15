import { User } from '../Models/user';

export class Moderator extends User {
    phoneNumber: string;

    constructor() {
        super();// Appelez le constructeur de la classe de base
        this.phoneNumber = "";
    }
}