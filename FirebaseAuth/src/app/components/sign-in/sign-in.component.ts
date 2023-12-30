import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { IndividualConfig } from 'ngx-toastr';
import {
	CommonService,
	toastPayload,
} from '../../shared/services/common.service';
@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
	toast!: toastPayload;
	email: string = '';
	password: string = '';
	constructor(private cs: CommonService, public authService: AuthService) {}
	ngOnInit() {}

	onSignIn(form: NgForm) {
		if (form.valid) {
			const email = (
				document.getElementsByName('userName')[0] as HTMLInputElement
			).value;
			const userPassword = (
				document.getElementsByName('userPassword')[0] as HTMLInputElement
			).value;
			this.showToast('sucess', 'Login success !');
			this.authService.SignIn(email, userPassword);
		} else {
			this.showToast('error', 'unable to login !');
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
