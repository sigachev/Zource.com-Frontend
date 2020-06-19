import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TelephoneNumbersValidatorDirective} from './validators/telephone-numbers-validator.directive';
import {OnlyIntegerDirective} from './only-integer.directive';
import {OnlyNumberDirective} from './only-number.directive';
import { UsernameValidatorDirective } from './validators/username-validator.directive';
import { UniqueEmailValidatorDirective } from './validators/email/unique-email-validator.directive';
import {EmailvalidatorDirective} from './validators/email/email-validator.directive';
import { ValidateEqualDirective } from './validators/validate-equal.directive';


@NgModule({
  declarations: [
    OnlyIntegerDirective,
    OnlyNumberDirective,
    UsernameValidatorDirective,
    EmailvalidatorDirective,
    TelephoneNumbersValidatorDirective,
    UniqueEmailValidatorDirective,
    ValidateEqualDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OnlyIntegerDirective,
    OnlyNumberDirective,
    UsernameValidatorDirective,
    EmailvalidatorDirective,
    TelephoneNumbersValidatorDirective,
    UniqueEmailValidatorDirective,
    ValidateEqualDirective
  ],
})
export class DirectivesModule {
}
