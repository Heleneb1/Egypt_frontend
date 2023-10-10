import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { SendEmailService } from 'src/app/services/send-email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  // contactForm: FormGroup;
  contact: Contact;

  // constructor(private sendEmail: SendEmailService, private formBuilder: FormBuilder) {
  //   this.contactForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     message: ['', Validators.required]
  //   });
  // }
  constructor (private sendEmail: SendEmailService) {
    this.contact = new Contact('', '', '', '');
  }

  sendMessage() {
    console.log(this.contact);

    if (this.contact) {
      const formData = this.contact;
      this.sendEmail.sendEmail(formData)
      this.contact = new Contact('', '', '', '');

    }
  }
}
