import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  usersOpen = false;

  users: User[] = [];


  constructor (
    private userService: UserService,
  ) { }


  ngOnInit(): void {

  }
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
    this.userService.deleteUsers(id).subscribe(() => {
      this.getUsers();
      alert('Utilisateur supprimé');
    });
  }
}