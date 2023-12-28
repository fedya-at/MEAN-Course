import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

const routes: Routes = [
	{ path: 'inscription', component: InscriptionComponent },
	{ path: 'users', component: UserDetailsComponent },
	{ path: '', pathMatch: 'full', component: HomeComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'tasks', component: TaskListComponent },
	{ path: 'add', component: TaskFormComponent },
	{ path: 'edit/:id', component: EditTaskComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
