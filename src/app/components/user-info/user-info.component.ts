import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input()
  userData: any;
  selectedFile: File | null = null;
  avatarFilename!: string;
  avatarUrl: SafeUrl | string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWje_gjVcmi-wks5nTRnW_xv5W2l3MVnk7W1QDcZuhNg&s';
  isEditingBiography = false;
  inputBiography = '';
  editIcon = 'fa fa-pencil';
  closeEditIcon = 'fa fa-times';
  newBio = '';
  user: any = [];
  biography = '';

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.userService.uploadAvatar(this.selectedFile, this.userData.id)?.subscribe(() => this.loadAvatar());
  }

  private objectURL: string | undefined;

  ngOnInit(): void {


    if (this.userData.biography !== null) {
      this.inputBiography = this.userData.biography; // Initialise inputBiography avec la valeur de la bio

    }
    if (this.userData.avatar !== null) {
      this.loadAvatar();
    }

  }

  ngOnDestroy(): void {
    if (this.objectURL) {
      URL.revokeObjectURL(this.objectURL);
    }
  }

  loadAvatar(): void {
    if (this.userData.avatar === null) {
      this.avatarFilename = this.userData.id + '.png';
    } else {
      this.avatarFilename = this.userData.avatar;
    }
    this.userService.getAvatar(this.avatarFilename).subscribe((res: Blob) => {
      if (this.objectURL) {
        URL.revokeObjectURL(this.objectURL);
      }
      this.objectURL = URL.createObjectURL(res);
      this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(this.objectURL);
    });
  }


  cancelUpdatedBiography() {
    if (this.isEditingBiography) {
      if (this.user.biography !== this.newBio) {
        this.newBio = this.user.biography;
        this.isEditingBiography = false;
      } else {
        this.isEditingBiography = false;
      }
    } else {
      this.newBio = this.user.biography;
      this.isEditingBiography = !this.isEditingBiography;
    }
  }


  onUpdateBio() {
    this.userService.updateBio(this.userData.id, this.inputBiography).subscribe(
      () => {
        this.isEditingBiography = false;
        this.user.biography = this.inputBiography;

      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la biographie :', error);
      }
    );
  }

  startEditingbiography() {
    this.isEditingBiography = true;
    this.inputBiography = this.userData.biography;
  }

}
