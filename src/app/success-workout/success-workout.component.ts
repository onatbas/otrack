import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutState, WorkoutStateStageInfo } from '../execute-workout/WorkoutState';
import { SuccessStates, WorkoutModel } from '../models/Workouts';

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


  ngOnInit(): void {
	this.route.params.subscribe(params => {
		console.log(params['state']);
		this.workoutState = JSON.parse(params['state']);
		this.save = params['save'];
		
		this.successState = this.workoutState.workout.successState;

		this.lastStage = this.workoutState.stages[this.workoutState.stages.length-1] || {time: 0};
		console.log(this.lastStage);
		this.workoutState.workout.archive = this.workoutState.stages;

		if (this.save){
			this.workoutState.workout.successState = SuccessStates.SUCCESS;
			this.workoutModel.updateWorkout(this.workoutState.workout.name, this.workoutState.workout);
		}
	});
  }


  onSuccessChange(){
	var copyWorkout = this.workoutModel.getWorkoutByName(this.workoutState.workout.name);
	copyWorkout.successState = this.successState;
	this.workoutModel.updateWorkout(copyWorkout.name, copyWorkout);
  }


  workouts(){
	this.router.navigate(['/workouts']);
  }

  home(){
	this.router.navigate(['/menu']);
  }

}
