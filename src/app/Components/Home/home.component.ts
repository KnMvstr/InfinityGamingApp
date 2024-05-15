import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../Models/game';
import { GameService } from '../../Services/game.service';
import { ReviewService } from '../../Services/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gameList: Game[] = [];
  reviewsCount = 0; //set a default value of review
  gamesCount = 0; //set a default value of review

  constructor(private router: Router, private gameService: GameService, private reviewService: ReviewService) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getAllGames();
    this.reviewService.getCount().subscribe({
      next: (count) => {
        this.reviewsCount = count;
      },
      error: (err) => {
        console.error('Failed to get reviews count', err);
      }
    });
    this.gameService.getCount().subscribe({
      next: (count) => {
        this.gamesCount = count;
      },
      error: (err) => {
        console.error('Failed to get games count', err);
      }
    });
  }

  getAllGames() {
    this.gameService.getAll().subscribe((games: Game[]) => {
      this.gameList = games;
    }, error => console.error('Error fetching games:', error));
  }
  
  //Slice worked fine but I needed to format the text to convert html in plain text.
  //<p class="card-text">{{ game.description | slice:0:120 }}{{ game.description.length > 120 ? '...' : '' }}</p> 
  // I need [innerHTML]= but it cannot be used with slice. I prepare the slice in the component and the html interpretation
  truncateHtml(input: string, length: number): string {
    // Remove HTML tags for length calculation
    const div = document.createElement('div');
    div.innerHTML = input;
    let text = div.textContent || div.innerText || '';
    // Truncate
    if (text.length <= length) {
      return input;
    }
    // Find the last space within length
    let lastSpace = text.lastIndexOf(' ', length);
    text = text.slice(0, lastSpace) + '...';

    return text;
  }

  //Navigate to game 
  navigateToGame(gameId: number) {
    this.router.navigate(['/game-detail', gameId]);
  }
}