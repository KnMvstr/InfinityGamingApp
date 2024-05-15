import { Component, OnInit } from '@angular/core';
import { Game } from '../../Models/game';
import { GameService } from '../../Services/game.service';
import { AuthService } from '../../auth-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameList : Game[] = [];
  gameToModify : Game = new Game();
  creatingMode : boolean = true;

  constructor (private gameService : GameService, private authService : AuthService){
  }

  ngOnInit() {
    this.getAllGames();
  }

  // Sort state properties
  currentSortField: string = '';
  currentSortDirection: 'asc' | 'desc' = 'asc';

  // Sort by field
  getAllSorted(field: string) {
    // Toggle if the same field is sorted again
    if (this.currentSortField === field) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Reset to ascending sort fornew field
      this.currentSortField = field;
      this.currentSortDirection = 'asc';
    }
    this.gameService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: Game[]) => {
        this.gameList = response;
      },
      error: (error) => console.error('Error fetching sorted games:', error)
    });
  }

  //Get All Games
  getAllGames() {
    this.gameService.getAll().subscribe((response: Game[]) => {
      //console.log(response); // This should show the array of game objects, helped to spot the json inconsistency
      this.gameList = response;
    }, error => {
      console.error('Error fetching games:', error);
    });
  }

//Update Game
modifyGame(){
  this.gameService.Update(this.gameToModify.id, this.gameToModify).subscribe(() => {
    alert("Game Updated Successfully");
    window.location.reload();
  })
}

//Create new Game
 // Must implement the properties set in DTO. 
 createGame(){
  console.log('create game method called', this.gameToModify);

  const newGame = {
    name : this.gameToModify.name,
    description : this.gameToModify.description,
    releaseDate : this.gameToModify.releaseDate,
    backgroundImage : this.gameToModify.backgroundImage,
    trailer : this.gameToModify.trailer,
    genre : this.gameToModify.genre,
    publisher : this.gameToModify.publisher,
    businessModel : this.gameToModify.businessModel,
    classification : this.gameToModify.classification,
    platforms : this.gameToModify.platforms,
  };
  this.gameService.create(newGame).subscribe(()=>{
    alert("Game Added Successfully");
    window.location.reload();
  });
}

//Delete Game
deleteGame(gameId : number){
  if(confirm("Are you sure you want to delete this game !!!")){
    this.gameService.Delete(gameId).subscribe(()=>{
      alert("Game Deleted Successfully");
      window.location.reload();
    });
  }
}

// function to verify the event
openModal(game : Game = new Game()){
  if(game.id == null || game.id === 0){
    this.gameToModify = new Game();
    this.creatingMode = true;
  }
    else{
    this.creatingMode = false
    this.gameToModify = game;
  }
}

get adminFeatures(): boolean {
  return this.authService.userHasRole('ROLE_SUPERADMIN');
}
}