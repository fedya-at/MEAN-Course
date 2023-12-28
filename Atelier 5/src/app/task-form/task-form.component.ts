import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from '../services/common.service';
import { TaskService } from '../services/task.service'; // Import TaskService

@Component({
	selector: 'app-task-form',
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
	task: { title: string; description: string } = { title: '', description: '' };
	toast!: toastPayload;

	constructor(
		private taskService: TaskService,
		private cs: CommonService,
		private router: Router
	) {}

	addTask() {
		if (this.task.title.trim() !== '') {
			this.taskService.addTask({
				title: this.task.title,
				description: this.task.description,
			});

			this.showToast('success', 'Task added successfully!');
			this.router.navigate(['/tasks']);
		} else {
			this.showToast('error', 'Task title is required!');
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
