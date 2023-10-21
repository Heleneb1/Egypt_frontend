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

  //   sendEmail(contact: Contact) {
  //     console.log("Nom", contact.username);
  //     console.log("sendEmail", contact);
  //     //     this.httpClient.post(this.emailUrl, contact).subscribe((response: HttpResponse<any>) => {
  //     //     if (response.status === 200 || response.status === 201) {
  //     //         this.status.emit({
  //     //             success: true,
  //     //             submitted: true,
  //     //         });
  //     //     } else if (response.status >= 400) {
  //     //         this.status.emit({
  //     //             success: false,
  //     //             submitted: true,
  //     //         });
  //     //     }
  //     // });

  //     return this.httpClient.post(this.emailUrl + '/send', {

  //       params: {

  //         username: contact.username,
  //         email: contact.email,
  //         content: contact.message,
  //       },


  //       responseType: 'text',
  //     })
  //       .subscribe((response) => alert(response));
  //   }
  // }
  sendEmail(contact: Contact) {
    console.log("Nom", contact);

    return this.httpClient.post(this.emailUrl + '/send', contact)
      .subscribe((response) => alert(response));


  }
}
