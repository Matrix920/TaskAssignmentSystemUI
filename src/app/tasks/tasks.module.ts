import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatTableModule } from '@angular/material/table';
import { AddTaskComponent } from './add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    AssignTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule
  ]
})
export class TasksModule { }
