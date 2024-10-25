import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: iUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: iUser[]) => {
      this.users = data;
    });
  }
}
