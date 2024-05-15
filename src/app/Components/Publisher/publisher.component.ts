import { Component } from '@angular/core';
import { Publisher } from '../../Models/publisher';
import { PublisherService } from '../../Services/publisher.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.scss'
})
export class PublisherComponent {
  publisherList: Publisher[] = [];
  publisherToModify: Publisher = new Publisher();
  creatingMode: boolean = true;
  constructor(private publisherService: PublisherService) {
    this.getAllPublishers();
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
    this.publisherService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: Publisher[]) => {
        this.publisherList = response;
      },
      error: (error) => console.error('Error fetching sorted publishers:', error)
    });
  }


  //Get All Publishers
  getAllPublishers() {
    this.publisherService.getAll().subscribe((response: Publisher[]) => {
      this.publisherList = response;
    });
  }

  //Update Publisher
  modifyPublisher() {
    this.publisherService.Update(this.publisherToModify.id, this.publisherToModify).subscribe(() => {
      alert("Publisher Updated Successfully");
      window.location.reload();
    })
  }

  //Create new Publisher
  // Must implement the properties set in DTO. 
  createPublisher() {
    console.log('create publisher method called', this.publisherToModify);

    const newPublisher = {
      name: this.publisherToModify.name,
    };
    this.publisherService.create(newPublisher).subscribe(() => {
      alert("Publisher Added Successfully");
      window.location.reload();
    });
  }

  //Delete Publisher
  deletePublisher(publisherId: number) {
    if (confirm("Are you sure you want to delete this publisher !!!")) {
      this.publisherService.Delete(publisherId).subscribe(() => {
        alert("Publisher Deleted Successfully");
        window.location.reload();
      });
    }
  }

  // function to verify the event
  openModal(publisher: Publisher = new Publisher()) {
    if (publisher.id == null || publisher.id === 0) {
      this.publisherToModify = new Publisher();
      this.creatingMode = true;
    }
    else {
      this.creatingMode = false
      this.publisherToModify = publisher;
    }
  }
}
