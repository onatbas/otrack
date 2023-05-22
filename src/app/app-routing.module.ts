import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { EditExerciseComponent } from './exercises/edit-exercise/edit-exercise.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { EditWorkoutComponent } from './workouts/edit-workout/edit-workout.component';

const routes: Routes = [
	{ path: '', redirectTo: '/menu', pathMatch: 'full' },
	{ path: 'menu',  component: MenuComponent },
	{ path: 'exercises', component: ExercisesComponent},
	{ path: 'workouts', component: WorkoutsComponent},
	{ path: 'editExercise', component: EditExerciseComponent},
	{ path: 'editWorkout', component: EditWorkoutComponent}
  ];
    
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
