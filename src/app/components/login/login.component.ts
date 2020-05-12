import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Role} from '../../models/role';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      if (this.authService.currentUserValue.role === Role.USER) {
        this.router.navigate(['/profile']);
      } else if (this.authService.currentUserValue.role === Role.ADMIN) {
        this.router.navigate(['/admin']);
      }

      return;
    }
  }

  login() {
    console.log('User: ' + JSON.stringify(this.user));
    this.authService.login(this.user).subscribe(data => {
      this.ngOnInit();
    }, err => {
      this.errorMessage = 'Username or password is incorrect';
    });

  }

}
