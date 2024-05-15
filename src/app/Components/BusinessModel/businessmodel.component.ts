import { Component } from '@angular/core';
import { BusinessModel } from '../../Models/business-model';
import { BusinessModelService } from '../../Services/business-model.service';

@Component({
  selector: 'app-businessmodel',
  templateUrl: './businessmodel.component.html',
  styleUrl: './businessmodel.component.scss'
})
export class BusinessmodelComponent {
  businessmodelList: BusinessModel[] = [];
  businessmodelToModify: BusinessModel = new BusinessModel();
  creatingMode: boolean = true;
  constructor(private businessmodelService: BusinessModelService) {
    this.getAllBusinessModels();
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
    this.businessmodelService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: BusinessModel[]) => {
        this.businessmodelList = response;
      },
      error: (error) => console.error('Error fetching sorted businessmodels:', error)
    });
  }

  //Get All BusinessModels
  getAllBusinessModels() {
    this.businessmodelService.getAll().subscribe((response: BusinessModel[]) => {
      this.businessmodelList = response;
    });
  }

  //Update BusinessModel
  modifyBusinessModel() {
    this.businessmodelService.Update(this.businessmodelToModify.id, this.businessmodelToModify).subscribe(() => {
      alert("BusinessModel Updated Successfully");
      window.location.reload();
    })
  }

  //Create new BusinessModel
  // Must implement the properties set in DTO. 
  createBusinessModel() {
    console.log('create businessmodel method called', this.businessmodelToModify);

    const newBusinessModel = {
      name: this.businessmodelToModify.name,
    };
    this.businessmodelService.create(newBusinessModel).subscribe(() => {
      alert("BusinessModel Added Successfully");
      window.location.reload();
    });
  }

  //Delete BusinessModel
  deleteBusinessModel(businessmodelId: number) {
    if (confirm("Are you sure you want to delete this businessmodel !!!")) {
      this.businessmodelService.Delete(businessmodelId).subscribe(() => {
        alert("BusinessModel Deleted Successfully");
        window.location.reload();
      });
    }
  }

  // function to verify the event
  openModal(businessmodel: BusinessModel = new BusinessModel()) {
    if (businessmodel.id == null || businessmodel.id === 0) {
      this.businessmodelToModify = new BusinessModel();
      this.creatingMode = true;
    }
    else {
      this.creatingMode = false
      this.businessmodelToModify = businessmodel;
    }
  }
}