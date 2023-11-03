import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendEmailService } from 'src/app/services/send-email.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;


  constructor (private sendEmail: SendEmailService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
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
      this.toastr.success('Votre message a bien été envoyé.Merci...', 'Message envoyé');

      this.contactForm.reset();
      this.router.navigate(['/profile']);
    } else {
      this.toastr.warning('Veuillez remplir tous les champs', 'Erreur');

    }
  }

}
