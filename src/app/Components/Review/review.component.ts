import { Component } from '@angular/core';
import { Review } from '../../Models/review';
import { ReviewService } from '../../Services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  reviewList: Review[] = [];
  reviewToModify: Review = new Review();
  creatingMode: boolean = true;

  constructor(private reviewService: ReviewService) {
    this.getAllReviews();
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
    this.reviewService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: Review[]) => {
        this.reviewList = response;
      },
      error: (error) => console.error('Error fetching sorted reviews:', error)
    });
  }

  //Get All Reviews
  getAllReviews() {
    this.reviewService.getAll().subscribe((response: Review[]) => {
      this.reviewList = response;
    });
  }

  //Update Review
  modifyReviews() {
    this.reviewService.Update(this.reviewToModify.id, this.reviewToModify).subscribe(() => {
      alert("User Updated Successfully");
      window.location.reload();
    })
  }

  //Create new Review
  // Must implement the properties set in DTO. 
  createReview() {
    console.log('create review method called', this.reviewToModify);

    const newReview = {
      game: this.reviewToModify.game,
      description: this.reviewToModify.description,
      rating: this.reviewToModify.rating,
      gamer: this.reviewToModify.gamer,
      createdAt: this.reviewToModify.createdAt,
      moderator: this.reviewToModify.moderator,
    };
    this.reviewService.create(newReview).subscribe(() => {
      alert("User Added Successfully");
      window.location.reload();
    });
  }

  //Delete Review
  deleteReview(reviewId: number) {
    if (confirm("Are you sure you want to delete this review !!!")) {
      this.reviewService.Delete(reviewId).subscribe(() => {
        alert("Review Deleted Successfully");
        window.location.reload();
      });
    }
  }

  openModal(review: Review = new Review()) {
    if (review.id == null || review.id === 0) {
      this.reviewToModify = new Review();
      this.creatingMode = true;
    } else {
      this.reviewToModify = review;
      this.creatingMode = false;
    }
  }
}