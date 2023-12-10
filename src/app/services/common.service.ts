import { Injectable } from '@angular/core';
import { GlobalConfig, IndividualConfig, ToastrService } from 'ngx-toastr';

export interface toastPayload {
  message: string;
  title: string;
  ic: IndividualConfig;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
user:any;

  constructor(private toastr: ToastrService) {
    // Define toastr GlobalConfig
    this.toastr.toastrConfig.enableHtml = true;
  }

  deleteUser() {

    this.user = null;
  }
  showToast(toast: toastPayload) {
    this.toastr.show(
      toast.message,
      toast.title,
      toast.ic,
      'toast-' + toast.type
    );
  }

}