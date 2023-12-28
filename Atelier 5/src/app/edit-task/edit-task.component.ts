import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from '../services/common.service';

@Component({
	selector: 'app-edit-task',
	templateUrl: './edit-task.component.html',
	styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
	taskId: number = 0;
	task: Task = { id: 0, title: '', description: '' }; // Initialize with default values
	toast!: toastPayload;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private taskService: TaskService,
		private cs: CommonService
	) {}

	ngOnInit(): void {
		this.taskId = +this.route.snapshot.paramMap.get('id')! ?? 0;

		this.task = this.taskService.getTaskById(this.taskId) || {
			id: 0,
			title: '',
			description: '',
		};
	}

	updateTask(): void {
		try {
			this.taskService.updateTask(this.task);

			this.showToast('success', 'Task updated successfully!');
		} catch (error) {
			this.showToast('error', 'Error updating task.');
			console.error('Error updating task:', error);
		}

		this.router.navigate(['/tasks']);
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
