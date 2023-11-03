import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BadgesService } from 'src/app/services/badges.service';
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
  avatarUrl: SafeUrl | string = 'https://cdn.pixabay.com/photo/2018/04/14/08/45/egypt-3318550_1280.jpg';
  isEditingBiography = false;
  inputBiography = '';
  editIcon = 'fa fa-pencil';
  closeEditIcon = 'fa fa-times';
  edit = 'fa  fa-plus-square';
  newBio = '';
  user: any = [];
  biography = '';
  badges: any;

  constructor (private userService: UserService, private sanitizer: DomSanitizer, private badgesService: BadgesService) { }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.userService.uploadAvatar(this.selectedFile, this.userData.id)?.subscribe(() => this.loadAvatar());
  }

  private objectURL: string | undefined;

  ngOnInit(): void {
    this.user = this.userData;
    const userBadges = this.userData.badgesIds || [];

    this.badges = [];

    userBadges.forEach((badgeId: string) => {
      this.badgesService.getBadgeContent(badgeId).subscribe((badgeInfo: any) => {
        this.badges.unshift(badgeInfo);
      });
    });

    while (this.badges.length < 8) {
      this.badges.push({ name: 'Badge à venir', image: 'assets/images/wait.jpg' });
    }

    if (this.userData.biography !== null) {
      this.inputBiography = this.userData.biography;
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
