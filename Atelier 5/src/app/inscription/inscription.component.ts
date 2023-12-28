import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from '../services/common.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  toast!: toastPayload;
  user: any;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.showToast('success', 'Form submitted successfully!');
      this.user = form.value;
      this.router.navigate(['/users', this.user]);
    } else {
      this.showToast('error', 'Form is not valid!');
    }
  }

  constructor(private cs: CommonService, private router: Router) {}

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
  buttonClick(type: string) {
    if (type === 'success') {
      this.showToast('success', 'User submitted successfully');
    } else {
      this.showToast('error', 'Error in submitting the user');
    }
  }
}
