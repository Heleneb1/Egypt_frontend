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
  contactForm: FormGroup;


  constructor (private sendEmail: SendEmailService, private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required, Validators.minLength(50)]]
    });
  }


  sendMessage() {
    console.log(this.contactForm.value);

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail.sendEmail(formData)
      alert('Votre message a bien été envoyé');
      this.contactForm.reset();
    } else {
      alert('Veuillez remplir tous les champs');
    }
  }

}
