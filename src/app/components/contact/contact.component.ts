import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendEmailService } from 'src/app/services/send-email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;


  constructor (private sendEmail: SendEmailService, private formBuilder: FormBuilder, private toastr: ToastrService) {
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
      console.log(formData);
      this.toastr.success('Votre message a bien été envoyé', 'Message envoyé');
      // alert('Votre message a bien été envoyé');
      this.contactForm.reset();
    } else {
      this.toastr.warning('Veuillez remplir tous les champs', 'Erreur');
      // alert('Veuillez remplir tous les champs');
    }
  }

}
