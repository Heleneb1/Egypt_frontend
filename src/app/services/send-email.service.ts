import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private emailUrl = environment.apiUrl + '/contact';

  constructor (private httpClient: HttpClient) { }

  sendEmail(contact: Contact) {
    console.log("Nom", contact);
    return this.httpClient.post(this.emailUrl + '/send', contact)
      .subscribe((response) => alert(response));

  }
}
