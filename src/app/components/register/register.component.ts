import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../password-validators';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

export interface RegisterUser {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  accepted: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() registrationStatus = new EventEmitter<{ success: boolean; submitted: boolean; }>();
  passwordMatch = true;
  passwordStrong = false;
  isEmailValid = false;
  formSubmitted = false;
  showPassword = false;
  userForm: FormGroup;
  accepted = false;
  isPasswordConfirmed = false;
  showModal = false;


  constructor (private http: HttpClient, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      confirmationPassword: ['']
    });
  }

  verifyPassword() {
    this.passwordMatch = this.userForm.value.password === this.userForm.value.confirmationPassword;
    if (this.passwordMatch) {
      this.isPasswordConfirmed = true;
      this.showModal = true;

    }
  }

  verifyPasswordStrength() {
    const password = this.userForm.value.password;
    this.passwordStrong = password !== undefined && password.length >= 12;

  }

  onSubmit() {
    this.formSubmitted = true;

    const isFormValid = this.userForm.valid;
    const isPasswordMatch = this.passwordMatch;
    const isPasswordStrong = this.passwordStrong;
    const isEmailValid = this.isEmailValid;
    const isConditionsAccepted = this.accepted;

    if (isFormValid && isPasswordMatch && isPasswordStrong && isEmailValid && isConditionsAccepted) {
      this.registerUser();
    } else {
      this.registrationStatus.emit({
        success: false,
        submitted: this.formSubmitted,
      });
      this.toastr.error('Veuillez remplir tous les champs et cocher la case d\'acceptation des conditions générales d\'utilisation', 'Erreur', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      this.showModal = false;
    }
  }


  checkEmail() {
    const email = this.userForm.value.email;
    this.isEmailValid = email !== undefined && /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i.test(email);
  }
  onIsAcceptedChange(accepted: boolean) {
    this.accepted = accepted;
    console.log('La case à cocher est acceptée dans l\'autre composant :', accepted);
    this.showModal = false;
  }


  registerUser() {

    const user: RegisterUser = {
      lastname: this.userForm.value.lastname,
      firstname: this.userForm.value.firstname,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      accepted: this.accepted,
    };

    console.log("accepté", user.accepted)

    this.userService.registerUser(user).subscribe(
      (response) => {
        console.log(response);
        this.registrationStatus.emit({
          success: true,
          submitted: this.formSubmitted,
        });
      },
      (error) => {
        console.log(error);
        this.registrationStatus.emit({
          success: false,
          submitted: this.formSubmitted,
        });
      }

    );

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  acceptConditions(event: { success: boolean; submitted: boolean }) {
    if (event.success && event.submitted) {
      console.log('Conditions accepted!');
    }
  }
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

}
