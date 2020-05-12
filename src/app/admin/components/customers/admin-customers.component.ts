import {Component, OnInit, ViewChild} from '@angular/core';

import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['id', 'firstName', 'lastName'];
  private errorMessage = '';
  private loading = false;
  users: User[];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private userService: UserService) {  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.data = this.users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error: any) => this.errorMessage = error,
    );
  }

}
