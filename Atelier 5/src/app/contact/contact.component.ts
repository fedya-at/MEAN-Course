import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from '../services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  toast!: toastPayload;
  message: any;

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.showToast('success', 'Form submitted successfully!');
      this.message = form.value;
      console.log('Your message', this.message);
    } else {
      this.showToast('error', 'Form is not valid!');
    }
  }

  constructor(private cs: CommonService) {}

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
