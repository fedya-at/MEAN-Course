import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CommonService } from './services/common.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
	declarations: [
		AppComponent,
		InscriptionComponent,
		UserDetailsComponent,
		HeaderComponent,
		FooterComponent,
		SidenavComponent,
		HomeComponent,
		ContactComponent,
		TaskListComponent,
		TaskFormComponent,
		EditTaskComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(),
	],
	providers: [CommonService],
	bootstrap: [AppComponent],
})
export class AppModule {}
