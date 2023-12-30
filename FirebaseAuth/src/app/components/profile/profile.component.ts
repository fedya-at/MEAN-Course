import { User } from './../../shared/services/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {
  CommonService,
  toastPayload,
} from '../../shared/services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  toast!: toastPayload;

  editedUser: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
  };

  constructor(public authService: AuthService, private cs: CommonService) {}
  ngOnInit(): void {}

  saveChanges(): void {
    this.editedUser.displayName =
      this.editedUser.displayName || this.authService.userData.displayName;
    this.editedUser.email =
      this.editedUser.email || this.authService.userData.email;
    this.editedUser.photoURL =
      this.editedUser.photoURL || this.authService.userData.photoURL;

    // Update the user profile
    this.authService
      .updateUserProfile(this.editedUser)
      .then(() => {
        this.showToast('success', 'User profile updated successfully');
      })
      .catch((error) => {
        this.showToast('error', `Error updating user profile: ${error}`);
      });
  }
  showToast(type: string, message: string) {
    this.toast = {
      message: message,
      title: '',
      type: type,
      ic: {
        timeOut: 5000,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }
}
