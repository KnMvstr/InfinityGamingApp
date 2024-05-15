import { Component } from '@angular/core';
import { Genre } from '../../Models/genre';
import { GenreService } from '../../Services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
genreList : Genre[] = [];
genreToModify : Genre = new Genre();
creatingMode : boolean = true;
constructor (private genreService : GenreService){
  this.getAllGenres();
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
    this.genreService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: Genre[]) => {
        this.genreList = response;
      },
      error: (error) => console.error('Error fetching sorted genres:', error)
    });
  }

  //Get All Genre
getAllGenres(){
  this.genreService.getAll().subscribe((response : Genre[])=>{
    this.genreList = response;
  });
}

//Update Genre
modifyGenre(){
  this.genreService.Update(this.genreToModify.id, this.genreToModify).subscribe(() => {
    alert("Genre Updated Successfully");
    window.location.reload();
  })
}

//Create new Genre
 // Must implement the properties set in DTO. 
 createGenre(){
  console.log('create genre method called', this.genreToModify);

  const newGenre = {
    name : this.genreToModify.name,
  };
  this.genreService.create(newGenre).subscribe(()=>{
    alert("Genre Added Successfully");
    window.location.reload();
  });
}

//Delete Genre
deleteGenre(genreId : number){
  if(confirm("Are you sure you want to delete this genre !!!")){
    this.genreService.Delete(genreId).subscribe(()=>{
      alert("GenreDeleted Successfully");
      window.location.reload();
    });
  }
}

// function to verify the event
openModal(genre : Genre = new Genre()){
  if(genre.id == null || genre.id === 0){
    this.genreToModify = new Genre();
    this.creatingMode = true;
  }
    else{
    this.creatingMode = false
    this.genreToModify = genre;
  }
}
}