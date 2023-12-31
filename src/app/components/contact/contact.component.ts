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
  animate: boolean = false;
  fly: boolean = false;
  message: string = '';
  showMessages: boolean = false;


  constructor (private sendEmail: SendEmailService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.contactForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required, Validators.minLength(50)]]
    });
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 5000);
  }


  sendMessage() {

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail.sendEmail(formData); // Add a semicolon here
      this.toastr.success('Votre message a bien été envoyé.Merci...', 'Message envoyé');

      this.contactForm.reset();
      this.fly = true;

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 5000);
    } else {
      this.toastr.warning('Veuillez remplir tous les champs', 'Erreur');
    }
  }


}  