import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, toastPayload } from './../services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  toast!: toastPayload;

  constructor(private route: ActivatedRoute, private cs: CommonService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.user = params;
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
  checkDelete() {
    if (this.user === null || typeof this.user === 'undefined') {
      this.showToast('success', 'User deleted successfully');
    } else {
      this.showToast('error', 'Error deleting the user');
    }
  }
  onDeleteUser() {
    this.user = null;

    this.checkDelete();
  }
}
