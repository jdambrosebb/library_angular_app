import { Component, OnInit } from '@angular/core';
import { Book } from '../books/book';
import { UserrequestService } from '../services/userrequest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService : UserrequestService) { }

  usersBooks : Book[] = [];

  ngOnInit(): void {
    this.usersBooks = this.userService.requestedBooks;
  }

}
