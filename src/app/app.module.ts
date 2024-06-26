import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import {MatListModule} from '@angular/material/list';
import { ExercisesComponent } from './exercises/exercises.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule } from '@angular/material/icon';
import { ExerciseListItemComponent } from './exercises/exercise-list-item/exercise-list-item.component';
import { ExerciseModel } from './models/Exercise';
import { EditExerciseComponent } from './exercises/edit-exercise/edit-exercise.component';

import {MatFormFieldModule } from '@angular/material/form-field';

import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';

import { FormsModule } from '@angular/forms';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutListItemComponent } from './workouts/workout-list-item/workout-list-item.component';
import { EquipmentListItemComponent } from './equipment/equipment-list-item/equipment-list-item.component';

import { WorkoutModel } from './models/Workouts';
import { EditWorkoutComponent } from './workouts/edit-workout/edit-workout.component';
import { WorkoutSetComponent } from './workouts/edit-workout/workout-set/workout-set.component';
import { WorkoutSetExerciseItemComponent } from './workouts/edit-workout/workout-set/workout-set-exercise-item/workout-set-exercise-item.component';
import { ExecuteWorkoutComponent } from './execute-workout/execute-workout.component';
import { SuccessWorkoutComponent } from './success-workout/success-workout.component';
import { ImportComponent } from './Import/import.component';
import { ExportComponent } from './Export/export.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EditEquipmentComponent } from './equipment/edit-equipment/edit-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExercisesComponent,
    ExerciseListItemComponent,
    EditExerciseComponent,
    WorkoutsComponent,
    WorkoutListItemComponent,
    EditWorkoutComponent,
    WorkoutSetComponent,
    WorkoutSetExerciseItemComponent,
    ExecuteWorkoutComponent,
    SuccessWorkoutComponent,
    ImportComponent,
    ExportComponent,
	EquipmentComponent,
    EquipmentListItemComponent,
    EditEquipmentComponent
  ],
  imports: [
	FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
	ReactiveFormsModule,
	MatFormFieldModule

  ],
  providers: [
	ExerciseModel, WorkoutModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
