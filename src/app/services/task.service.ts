import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
	providedIn: 'root',
})
export class TaskService {
	private localStorageKey = 'tasks';
	private tasks: Task[] = [];

	constructor() {
		const storedTasks = localStorage.getItem(this.localStorageKey);
		this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
	}

	private saveTasks(): void {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
	}

	getAllTasks(): Task[] {
		return this.tasks;
	}
	getTaskById(id: number): Task | null {
		return this.tasks.find((task) => task.id === id) || null;
	}

	addTask(taskDetails: { title: string; description: string }): void {
		const newTask: Task = {
			id: this.tasks.length + 1,
			title: taskDetails.title,
			description: taskDetails.description,
		};

		this.tasks.push(newTask);
		this.saveTasks(); // Save tasks after adding a new task
	}

	updateTask(updatedTask: Task): void {
		const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
		if (index !== -1) {
			this.tasks[index] = { ...this.tasks[index], ...updatedTask };
			this.saveTasks(); // Save tasks after updating a task
		}
	}

	deleteTask(id: number): void {
		this.tasks = this.tasks.filter((task) => task.id !== id);
		this.saveTasks();
	}
}
