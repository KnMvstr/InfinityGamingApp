import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, debounceTime, switchMap, filter, tap, distinctUntilChanged, catchError, map } from 'rxjs/operators';
import { SearchService } from '../../Services/Search/search.service';
import { Game } from '../../Models/game';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();
  showResults = true; // Variable to control results display
  results!: Observable<Game[]>;
  routerSubscription!: Subscription;

  constructor(private searchService: SearchService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.setupSearch();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log("NavigationEnd event triggered");
      this.showResults = false; // Optionally reset search results on navigation
      this.setupSearch();
      this.cdr.detectChanges();  // Detect changes after setup; // Re-setup the search subscription if needed
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      console.log("Router subscription unsubscribed");
    }
  }

  setupSearch() {
    if (this.searchControl.valueChanges) {
      console.log("Setting up search subscription");
      this.results = this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.searchService.searchGames(term).pipe(
          map(games => games.slice(0, 2)), // Takes only the first two games from the results
          tap(games =>
            console.log("Received games:", games)),
          catchError(error => {
            console.error('Search failed:', error);
            return [];
          })
        )));
    }
  }

  onSelect(game: Game): void {
    if (game.id) {
      this.router.navigate(['/game-detail', game.id]);
      this.searchControl.reset();
      this.showResults = false;
      this.cdr.detectChanges();
    }
  }

  onUnavailable(): void {
    alert('Details for this game are not available.');
  }

  onSearchInput(): void {
    this.showResults = true;
    console.log("Search input activated");
  }
}