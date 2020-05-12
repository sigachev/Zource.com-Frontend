import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../models/user';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {

  userList: Array<User>;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.findAllUsers();
  }

  findAllUsers() {
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
    });
  }

  detail(user: User) {
    localStorage.setItem('detailUser', JSON.stringify(user));
    this.router.navigate(['/detail', user.id]);
  }
}
