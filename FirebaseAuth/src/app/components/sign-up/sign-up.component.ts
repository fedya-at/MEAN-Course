import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import {
	CommonService,
	toastPayload,
} from '../../shared/services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
	toast!: toastPayload;
	email: string = '';
	password: string = '';
	displayName: string = ''; // Declare displayName as a property

	constructor(private cs: CommonService, public authService: AuthService) {}

	ngOnInit() {}

	onSignUp(form: NgForm) {
		if (form.valid) {
			this.showToast('success', 'Sign Up success!');
			this.authService.SignUp(this.email, this.password, this.displayName);
		} else {
			this.showToast('error', 'Unable to sign up!');
		}
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
