import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { EditExerciseComponent } from './exercises/edit-exercise/edit-exercise.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { EditWorkoutComponent } from './workouts/edit-workout/edit-workout.component';
import { ExecuteWorkoutComponent } from './execute-workout/execute-workout.component';
import { SuccessWorkoutComponent } from './success-workout/success-workout.component';
import { ImportComponent } from './Import/import.component';
import { ExportComponent } from './Export/export.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EditEquipmentComponent } from './equipment/edit-equipment/edit-equipment.component';

const routes: Routes = [
	{ path: '',  component: MenuComponent },
	{ path: 'menu', redirectTo: '', pathMatch: 'full' },
	{ path: 'exercises', component: ExercisesComponent},
	{ path: 'workouts', component: WorkoutsComponent},
	{ path: 'equipment', component: EquipmentComponent },
	{ path: 'editExercise', component: EditExerciseComponent},
	{ path: 'editWorkout', component: EditWorkoutComponent},
	{ path: 'executeWorkout', component: ExecuteWorkoutComponent},
	{ path: 'successWorkout', component: SuccessWorkoutComponent},
	{ path: 'import', component: ImportComponent},
	{ path: 'export', component: ExportComponent},
	{ path: 'editEquipment', component: EditEquipmentComponent}
  ];
    
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
