import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';

export function uniqueEmailValidator(userServ: UserService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userServ.checkIfEmailExists(c.value).pipe(
      map(data => {
        if (!data) {
          return null;
        } else {
          return {
            uniqueEmailValidator: { valid: false }
          };
        }
      }),
      debounceTime(1000)
    );
  };
}

@Directive({
  selector: '[uniqueEmailValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true}]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return uniqueEmailValidator(this.userService)(c);
  }

}
