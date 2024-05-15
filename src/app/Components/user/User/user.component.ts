import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  userList: User[] = [];
  // this variable is get data from model
  userToModify: User = new User();
  // this variable determines wither we are in changing or creating new user
  creatingMode: boolean = true;

  constructor(private userService: UserService) {
    this.getAllUsers();
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
    this.userService.getSortedByFieldAndDirection(field, this.currentSortDirection).subscribe({
      next: (response: User[]) => {
        this.userList = response;
      },
      error: (error) => console.error('Error fetching sorted users:', error)
    });
  }

  //Get All Users
  getAllUsers() {
    this.userService.getAll().subscribe((response: User[]) => {
      this.userList = response;
    });
  }

  //Update User
  modifyUser() {
    this.userService.Update(this.userToModify.id, this.userToModify).subscribe(() => {
      alert("User Updated Successfully");
      window.location.reload();
    })
  }

  //Create new User
  createUser() {
    console.log('create user method called', this.userToModify);

    const newUser = {
      email: this.userToModify.email,
      pseudo: this.userToModify.pseudo,
      //Here I set previously linked the corresponding data to my backend saying it does correspond to my private pwd defined private by "_" but encountered an issue when testing the registration. 
      //_pwd was correctly populated but not sent to create the user leading to a expection handler for an empty pwd. 
      pwd: this.userToModify.pwd,
      userType: this.userToModify.userType
    };
    this.userService.create(newUser).subscribe(() => {
      alert("User Added Successfully");
      window.location.reload();
    });
  }

  //Delete User
  deleteUser(userId: number) {
    if (confirm("Are you sure you want to delete this user !!!")) {
      this.userService.Delete(userId).subscribe(() => {
        alert("User Deleted Successfully");
        window.location.reload();
      });
    }
  }

  // function to verify the event
  openModal(user: User = new User()) {
    if (user.id == null || user.id === 0) {
      this.userToModify = new User();
      this.creatingMode = true;
    }
    else {
      this.creatingMode = false
      this.userToModify = user;
    }
  }
}