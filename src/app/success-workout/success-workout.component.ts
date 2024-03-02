import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutState, WorkoutStateStageInfo } from '../execute-workout/WorkoutState';
import { SuccessStates, WorkoutModel } from '../models/Workouts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-success-workout',
  templateUrl: './success-workout.component.html',
  styleUrls: ['./success-workout.component.css']
})
export class SuccessWorkoutComponent implements OnInit {

  constructor(
	private router:Router,
	private route:ActivatedRoute,
	private workoutModel:WorkoutModel
  ) {
	
  }

  workoutState:WorkoutState = new WorkoutState;
  save:boolean = false;
  lastStage:WorkoutStateStageInfo = new WorkoutStateStageInfo;

  successState:SuccessStates = SuccessStates.SUCCESS;
  selectionOptions = Object.entries(SuccessStates).map(([key, value]) => ({ key, value }));
  completionDate: Date = new Date( Date.now());


  ngOnInit(): void {
	this.route.params.subscribe(params => {
		console.log(params['state']);
		this.workoutState = JSON.parse(params['state']);
		this.save = params['save'];
		
		this.successState = this.workoutState.workout.successState;
		this.completionDate = new Date(this.workoutState.workout.completionDate);

		this.lastStage = this.workoutState.stages[this.workoutState.stages.length-1] || {time: 0};
		console.log(this.lastStage);
		this.workoutState.workout.archive = this.workoutState.stages;

		if (this.save){
			this.completionDate = new Date();
			this.workoutState.workout.completionDate = this.completionDate.toDateString();
			this.successState = SuccessStates.SUCCESS;
			this.workoutState.workout.successState = this.successState;
			this.workoutModel.updateWorkout(this.workoutState.workout.name, this.workoutState.workout);
		}
	});
  }

  reset(){
	this.workoutState.workout.archive = [];
	this.workoutState.workout.sets.forEach(set => {
		set.exercises.forEach(exercise =>{
				exercise.successes = [];
		});
	});
	this.workoutState.workout.successState = this.successState = SuccessStates.NONE;
	this.workoutState.workout.completionDate =  "N/A";
	this.completionDate = new Date();
	this.workoutModel.updateWorkout(this.workoutState.workout.name, this.workoutState.workout);
  }


  onSuccessChange(){
	var copyWorkout = this.workoutModel.getWorkoutByName(this.workoutState.workout.name);
	copyWorkout.successState = this.successState;
	this.workoutModel.updateWorkout(copyWorkout.name, copyWorkout);
  }


  resetCompletion(){
	this.completionDate = new Date(0);
	this.onDateChange();
  }

  onDateChange(){
	const date = this.completionDate.getTime() == 0 ? "N/A" : this.completionDate.toDateString();
	console.log("Date change" + date);
	var copyWorkout = this.workoutModel.getWorkoutByName(this.workoutState.workout.name);
	copyWorkout.completionDate = date;
	this.workoutModel.updateWorkout(copyWorkout.name, copyWorkout);
  }

  workouts(){
	this.router.navigate(['/workouts']);
  }

  home(){
	this.router.navigate(['/menu']);
  }

}
