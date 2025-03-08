import { Component } from '@angular/core';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent {
  selectedTab = 'login';
  registrationSuccessful: undefined | boolean = undefined;
  formSubmitted = false;
  registrationPhrase = {
    successTitle: 'Bienvenue !',
    successText: 'Votre compte a bien été créé.',
    failure: 'Une erreur est survenue lors de la création de votre compte',
  };
  errorMessage: string | null = null;

  handleLoginError(message: string) {
    this.errorMessage = message;
  }

  onRegistrationStatus(status: { success: boolean; submitted: boolean }) {
    this.formSubmitted = status.submitted;
    if (status.success) {
      this.selectedTab = 'login';
      this.registrationSuccessful = true;
    } else {
      this.registrationSuccessful = false;
    }
  }

  selectTab(event: Event) {
    this.formSubmitted = false;
    this.registrationSuccessful = undefined;
    this.selectedTab =
      (event.target as Element).textContent?.toLowerCase() === 'connexion'
        ? 'login'
        : 'register';
  }
}
