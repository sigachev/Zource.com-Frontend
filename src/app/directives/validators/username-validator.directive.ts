import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

export function uniqueUsernameValidator(userServ: UserService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userServ.checkIfUsernameExists(c.value).pipe(
      map(data => {
        if (!data) {
          return null;
        } else {
          return {
            usernameValidator: { valid: false }
          };
        }
      }),
      debounceTime(3000)
    );
  };
}

@Directive({
  selector: '[usernameValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true}]
})
export class UsernameValidatorDirective implements AsyncValidator {



  constructor(private userService: UserService) {

  }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueUsernameValidator(this.userService)(c);
  }

}
