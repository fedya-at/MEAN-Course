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

  constructor(
    private route: ActivatedRoute,
    private cs: CommonService
  ) {}

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

  onDeleteUser() {
    this.user = null;
    this.showToast('success', 'User deleted successfully');
  }

  buttonClick(type: string) {
    if (type === 'success') {
      this.showToast('success', 'User submitted successfully');
    } else {
      this.showToast('error', 'Error in submitting the user');
    }
  }
}
