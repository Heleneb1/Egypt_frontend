import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from 'src/app/models/contact';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private emailUrl = environment.apiUrl + '/contact';

  constructor (private httpClient: HttpClient, private toastr: ToastrService, private userService: UserService) { }

  getContact() {
    return this.httpClient.get(this.emailUrl + '/see-message');
  }
  deleteContact(id: number) {
    return this.httpClient.delete(`${this.emailUrl}/${id}`);
  }

  sendEmail(contact: Contact) {
    return this.httpClient.post(this.emailUrl + '/send', contact)
      .subscribe((response) => this.toastr.success('Votre message a bien été envoyé', 'Message envoyé'),);

  }
  SendMessage(user: User) {
    this.userService.getUserEmail(user.id).subscribe((userEmail: string) => {
      user.email = userEmail;

      const emailData = {

        author: {

          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,

        },
      };

      this.httpClient.post(this.emailUrl + '/send-after-comment', emailData, { responseType: 'text' }).subscribe(
        (response: any) => {
          //reponse du backend une chaine de caractère erreur: "Unexpected token 'N', \"Notificati\"... is not valid JSON"
          this.handleSendMessageSuccess();
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du message:', error);
          this.handleSendMessageError();
        }
      );
    });
  }


  private handleSendMessageSuccess() {
    this.toastr.success('Votre message a bien été envoyé pour commentaire refusé', 'Succès');
  }

  private handleSendMessageError() {
    this.toastr.error('Erreur lors de l\'envoi du message', 'Erreur');
  }
}