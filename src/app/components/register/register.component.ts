import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {FrontendLayoutComponent} from '../../layout/frontend-layout.component';
import {AuthenticationService} from '../../services/authentication.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f', {static: true}) form: NgForm;
  user: User = new User();
  errorMessage: string;
  checkboxTermsFlag = false;
  confPassword = '';
  usernameAlredyExists = false;


  constructor(layout: FrontendLayoutComponent,
              private authService: AuthenticationService,
              private userService: UserService,
              private router: Router) {
    layout.displayBreadcrumb = true;
    layout.displayHomeSlider = false;
  }


  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/profile']);
      return;
    }
/*    this.user.firstName = 'AAAA';
    this.user.lastName = 'AAAA';
    this.user.email = 'a@aa.com';
    this.user.password = 'aaaaaa';*/
  }


  register() {
      this.userService.checkIfUsernameExists(this.user.username).subscribe(data =>
          this.usernameAlredyExists = data,
        err => {
          this.errorMessage = err.message.message;
        });


      if (this.form.valid) {
        console.log('Username already exists: ' + this.usernameAlredyExists);
        this.userService.register(this.user).subscribe(data => {
            this.router.navigate(['/login']);
          },
          err => {
            this.errorMessage = err.message.message;
          }
        );
      }
    }

}
