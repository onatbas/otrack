import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { EditExerciseComponent } from './exercises/edit-exercise/edit-exercise.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { EditWorkoutComponent } from './workouts/edit-workout/edit-workout.component';
import { ExecuteWorkoutComponent } from './execute-workout/execute-workout.component';
import { SuccessWorkoutComponent } from './success-workout/success-workout.component';

const routes: Routes = [
	{ path: '',  component: MenuComponent },
	{ path: 'menu', redirectTo: '', pathMatch: 'full' },
	{ path: 'exercises', component: ExercisesComponent},
	{ path: 'workouts', component: WorkoutsComponent},
	{ path: 'editExercise', component: EditExerciseComponent},
	{ path: 'editWorkout', component: EditWorkoutComponent},
	{ path: 'executeWorkout', component: ExecuteWorkoutComponent},
	{ path: 'successWorkout', component: SuccessWorkoutComponent}
  ];
    
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
