import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailValidatorDirective} from './validators/email-validator.directive';
import {TelephoneNumbersValidatorDirective} from './validators/telephone-numbers-validator.directive';
import {OnlyIntegerDirective} from './only-integer.directive';
import {OnlyNumberDirective} from './only-number.directive';
import { UsernameValidatorDirective } from './validators/username-validator.directive';


@NgModule({
  declarations: [
    OnlyIntegerDirective,
    OnlyNumberDirective,
    UsernameValidatorDirective,
    EmailValidatorDirective,
    TelephoneNumbersValidatorDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OnlyIntegerDirective,
    OnlyNumberDirective,
    UsernameValidatorDirective,
    EmailValidatorDirective,
    TelephoneNumbersValidatorDirective
  ],
})
export class DirectivesModule {
}
