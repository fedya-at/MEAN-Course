import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from '../services/common.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
	tasks: Task[];
	toast!: toastPayload;

	constructor(
		private taskService: TaskService,
		private router: Router,
		private cs: CommonService
	) {
		this.tasks = this.taskService.getAllTasks();
	}

	deleteTask(id: number): void {
		try {
			this.taskService.deleteTask(id);
			this.showToast('success', 'Task deleted successfully!');
		} catch (error) {
			this.showToast('error', 'Error deleting task.');
			console.error('Error deleting task:', error);
		}
	}
	editTask(task: Task): void {
		this.router.navigate(['/edit', task.id]);
	}

	addTask(): void {
		this.router.navigate(['/add']);
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
