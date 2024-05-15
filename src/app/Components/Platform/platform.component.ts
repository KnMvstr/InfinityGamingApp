import { Component } from '@angular/core';
import { Platform } from '../../Models/platform';
import { PlatformService } from '../../Services/platform.service';
import { AuthService } from '../../auth-service.service';
import { Game } from '../../Models/game';
import { GameService } from '../../Services/game.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss'
})
export class PlatformComponent {
  platformList : Platform[] = [];
  allGames: Game[] = []; 
  selectedGames: Game[] = [];
  platformToModify : Platform = new Platform();
  creatingMode : boolean = true;
  gameSelections: { [key: number]: boolean } = {};

  constructor (private platformService : PlatformService,  private authService : AuthService, private gameService : GameService){ // Easiest way to implement the AuthService
    this.getAllPlatforms();
    this.loadAllGames();
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
    this.platformService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: Platform[]) => {
        this.platformList = response;
      },
      error: (error) => console.error('Error fetching sorted platforms:', error)
    });
  }

   //Get All Platforms
getAllPlatforms(){
  this.platformService.getAll().subscribe((response : Platform[])=>{
    this.platformList = response;
  });
}

//Update Platform 
modifyPlatform() {
  // Ensure that the selected games are assigned to the platform's games array
  this.platformToModify.games = this.selectedGames;

  this.platformService.Update(this.platformToModify.id, this.platformToModify).subscribe({
    next: () => {
      alert("Platform Updated Successfully");

      // Update local list of platforms to reflect the change
      const index = this.platformList.findIndex(p => p.id === this.platformToModify.id);
      if (index !== -1) {
        this.platformList[index] = {...this.platformToModify};
      }
      // this.router.navigate(['/platforms']); // Navigate if needed
    },
    error: error => {
      console.error('Failed to update platform:', error);
      alert("Failed to update the platform");
    }
  });
}

loadAllGames() {
  this.gameService.getAll().subscribe(allGames => {
    this.allGames = allGames;

    // Initialize the gameSelections map
    this.gameSelections = {}; // Reset selections
    
    if (this.creatingMode) {
      // If creating a new platform, no games are pre-selected
      this.allGames.forEach(game => this.gameSelections[game.id] = false);
    } else {
      // If editing an existing platform, pre-select the games already on the platform
      const platformGameIds = this.platformToModify.games.map(game => game.id);
      this.allGames.forEach(game => {
        this.gameSelections[game.id] = platformGameIds.includes(game.id);
      });

      // Update selectedGames based on pre-selected games
      this.selectedGames = this.allGames.filter(game => this.gameSelections[game.id]);
    }
  });
}

updateSelectedGames(game: Game) {
  this.gameSelections[game.id] = !this.gameSelections[game.id];  // Toggle selection state

  if (this.gameSelections[game.id]) {
    this.selectedGames.push(game); // Add to selectedGames
  } else {
    this.selectedGames = this.selectedGames.filter(g => g.id !== game.id); // Remove from selectedGames
  }
}

//Create new Platform
 // Must implement the properties set in DTO. 
 createPlatform(){
  console.log('create platform method called', this.platformToModify);

  const newPlatform = {
    name : this.platformToModify.name,
  };
  this.platformService.create(newPlatform).subscribe(()=>{
    alert("Platform Added Successfully");
    window.location.reload();
  });
}

//Delete Platform
deletePlatform(platformId : number){
  if(confirm("Are you sure you want to delete this platform !!!")){
    this.platformService.Delete(platformId).subscribe(()=>{
      alert("Platform Deleted Successfully");
      window.location.reload();
    });
  }
}

// function to verify the event
openModal(platform: Platform = new Platform()) {
  this.platformToModify = platform.id ? { ...platform } : new Platform();
  this.creatingMode = !platform.id;

  this.loadAllGames();  // This will now need to handle pre-selection
}

get adminFeatures(): boolean {
  return this.authService.userHasRole('ROLE_SUPERADMIN');
}
}