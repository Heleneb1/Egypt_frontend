// gcu.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor (private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.gcuForm = this.fb.group({
      accepted: [false, Validators.requiredTrue]
    });

    // ...

    this.gcuForm.get('accepted')?.valueChanges.subscribe(value => {
      this.showModal = false;
      this.isAcceptedChange.emit(value);

    });
    if (this.router.url == '/gcu') {
      this.showCheckbox = false;
    }
  }


}
