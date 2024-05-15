import { Component } from '@angular/core';
import { Classification } from '../../Models/classification';
import { ClassificationService } from '../../Services/classification.service';
@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.scss'
})
export class ClassificationComponent {
  classificationList : Classification[] = [];
  classificationToModify : Classification = new Classification();
  creatingMode : boolean = true;
  constructor (private classificationService : ClassificationService){
    this.getAllClassifications();
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
    this.classificationService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: Classification[]) => {
        this.classificationList = response;
      },
      error: (error) => console.error('Error fetching sorted classifications:', error)
    });
  }

  //Get All Classifications
getAllClassifications(){
  this.classificationService.getAll().subscribe((response : Classification[])=>{
    this.classificationList = response;
  });
}

//Update Classification
modifyClassification(){
  this.classificationService.Update(this.classificationToModify.id, this.classificationToModify).subscribe(() => {
    alert("Classification Updated Successfully");
    window.location.reload();
  })
}

//Create new Classification
 // Must implement the properties set in DTO. 
 createClassification(){
  console.log('create classification method called', this.classificationToModify);

  const newClassification = {
    name : this.classificationToModify.name,
    description : this.classificationToModify.description,
  };
  this.classificationService.create(newClassification).subscribe(()=>{
    alert("Classification Added Successfully");
    window.location.reload();
  });
}

//Delete Classification
deleteClassification(classificationId : number){
  if(confirm("Are you sure you want to delete this classification !!!")){
    this.classificationService.Delete(classificationId).subscribe(()=>{
      alert("Classification Deleted Successfully");
      window.location.reload();
    });
  }
}

// function to verify the event
openModal(classification : Classification = new Classification()){
  if(classification.id == null || classification.id === 0){
    this.classificationToModify = new Classification();
    this.creatingMode = true;
  }
    else{
    this.creatingMode = false
    this.classificationToModify = classification;
  }
}
}