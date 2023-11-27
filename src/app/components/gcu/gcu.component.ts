// gcu.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gcu',
  templateUrl: './gcu.component.html',
  styleUrls: ['./gcu.component.scss']
})
export class GCUComponent {
  showModal: boolean = true;
  gcuForm!: FormGroup;
  showCheckbox = true;
  userConnected: any;
  @Output() isAcceptedChange = new EventEmitter<boolean>();

  constructor (private fb: FormBuilder, private authService: AuthService, private userService: UserService) { }

  // ngOnInit() {
  //   // Créez votre formulaire avec une case à cocher
  //   this.gcuForm = this.fb.group({
  //     accepted: [false, Validators.requiredTrue]
  //   });

  //   // ...

  //   this.gcuForm.get('accepted')?.valueChanges.subscribe(value => {
  //     console.log('La case à cocher est cochée :', value);
  //     this.isAcceptedChange.emit(value);
  //   });
  // }
  ngOnInit() {
    this.authService.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      console.log("user", user);
      if (user) {
        this.showCheckbox = false;
      }
    });

    // Create your form with a checkbox only if showCheckbox is true
    if (this.showCheckbox) {
      this.gcuForm = this.fb.group({
        accepted: [false, Validators.requiredTrue]
      });

      this.gcuForm.get('accepted')?.valueChanges.subscribe(value => {
        console.log('La case à cocher est cochée :', value);
        this.isAcceptedChange.emit(value);
      });
    }
  }

}
