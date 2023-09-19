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
  editIcon = 'assets/images/pencil.svg';
  closeEditIcon = 'assets/images/cross.svg';

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.userService.uploadAvatar(this.selectedFile, this.userData.id)?.subscribe(() => this.loadAvatar());
  }

  private objectURL: string | undefined;

  ngOnInit(): void {
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
      if (this.userData.Biography !== this.inputBiography) {
        this.inputBiography = this.userData.Biography;
        this.isEditingBiography = false;
      } else {
        this.isEditingBiography = false;
      }
    } else {
      this.inputBiography = this.userData.Biography;
      this.isEditingBiography = !this.isEditingBiography;
    }
  }

  onUpdateBio() {
    this.userData.biography = this.inputBiography;
    this.userService.updateBio(this.userData.id, this.userData).subscribe(() => {
      this.isEditingBiography = false;
    });
  }
}
