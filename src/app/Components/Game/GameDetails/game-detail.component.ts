import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../Services/game.service';
import { Game } from '../../../Models/game';
import { Review } from '../../../Models/review';
import { ReviewService } from '../../../Services/review.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;
  reviews: Review[] = [];
  
  constructor(private route: ActivatedRoute, private gameService: GameService, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const gameId = params.get('id');
      if (gameId) {
        this.loadGameDetails(+gameId); // the unary plus converts the string to a number
      }
    });
  }
  
  private loadGameDetails(gameId: number) {
    this.gameService.get(gameId).subscribe({
      next: (game: Game | undefined) => {
        this.game = game;
        if (game) {
          this.loadReviewsForGame(game.id); //Get the Review for the specific game
        }
      },
      error: (err: any) => console.error('Failed to get game details', err)
    });
  }

  private loadReviewsForGame(gameId: number) { //Load the reviews by game id. Using the method in revieww service
    this.reviewService.getReviewByGameId(gameId).subscribe({
      next: (reviews: Review[]) => {
        this.reviews = reviews;
      },
      error: (err: any) => console.error('Failed to load reviews', err)
    });
}
}