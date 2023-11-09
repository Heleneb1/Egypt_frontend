// src/app/password-validator.ts

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*[ ])/;
    // Explanation of the regex:
    // (?=.*[A-Z]): At least one uppercase letter
    // (?=.*\d): At least one digit
    // (?=.*[@#$%^&+=]): At least one of the special characters (@, #, $, %, ^, &, +, or =)
    // (?!.*[ ]): No spaces allowed

    const valid = passwordRegex.test(control.value);

    const errors = {
        password: {
            rules: 'must contain at least one uppercase letter, one digit, and one special character, with no spaces'
        }
    };



    return !valid ? errors : null;
}