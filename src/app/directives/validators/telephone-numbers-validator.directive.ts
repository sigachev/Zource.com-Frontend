import { Directive } from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[telephoneNumbers]',
  providers: [{provide: NG_VALIDATORS, useExisting: TelephoneNumbersValidatorDirective, multi: true}]
})
export class TelephoneNumbersValidatorDirective implements Validator {

  validate(form: FormGroup): ValidationErrors {

    const message = {
      telephoneNumbers: {
        message: 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = form.get('phoneNumbers') as FormGroup;
    const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;

    return hasPhoneNumbers ? null : message;
  }
}
