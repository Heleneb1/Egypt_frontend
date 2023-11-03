import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  usersOpen = false;
  users: User[] = [];
  constructor (private userService: UserService, private toastr: ToastrService) { }

  getUsers() {
    this.usersOpen = !this.usersOpen;
    if (this.usersOpen) {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        console.log(users);
      });
    }
  }

  deleteUser(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {

      this.userService.deleteUsers(id).subscribe(() => {
        this.getUsers();
        // alert('Utilisateur supprimé');
        this.toastr.success('Utilisateur supprimé', 'Suppression');
      });
    }
  }
}
