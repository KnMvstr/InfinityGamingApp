export class User {
  id: number;
  pseudo: string;
  email: string;
  pwd: string; // Utilisez un underscore pour les propriétés privées en TypeScript
  userType: string;

  constructor() {
    this.id = 0;
    this.pseudo = "";
    this.email = "";
    this.pwd = "";
    this.userType = ""
  }
}