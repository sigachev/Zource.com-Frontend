import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {ToastService} from 'ng-uikit-pro-standard';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  model: any = {};
  errorMessage: string;

  private title = 'Browser Push Notifications!';

  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private toast: ToastService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.model = this.currentUser;
    }
  }

  logOut() {
    this.authService.logOut();
  }

  onSubmit() {
    console.log(this.model);

    this.userService.update(this.model).subscribe(data => {
     /* this.router.navigate(['/profile']);*/
      this.toast.success('User updated!');
    }, err => {
      this.toast.error('Cannot update user.');
    });
  }

  notify() {
    setTimeout(
      () =>
        this.toast.success('It works!'), 1000
    );
  }


}
