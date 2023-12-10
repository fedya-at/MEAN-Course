import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from './services/common.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project1';
  toast!: toastPayload;

  constructor(private cs: CommonService) {}

  buttonClick(type: string) {
    this.toast = {
      message: `Some <i>Message</i> to <b>Show</b>
                <h3>heading5</h3>`,
      title: 'Title Text',
      type: type,
      ic: {
        timeOut: 5000,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }
}
