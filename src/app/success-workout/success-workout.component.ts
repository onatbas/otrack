import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutState, WorkoutStateStageInfo } from '../execute-workout/WorkoutState';
import { WorkoutModel } from '../models/Workouts';

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
  lastStage:WorkoutStateStageInfo = new WorkoutStateStageInfo;

  ngOnInit(): void {
	this.route.params.subscribe(params => {
		console.log(params['state']);
		this.workoutState = JSON.parse(params['state']);

		this.lastStage = this.workoutState.stages[this.workoutState.stages.length-1];
		this.workoutState.workout.archive = this.workoutState.stages;

		this.workoutModel.updateWorkout(this.workoutState.workout.name, this.workoutState.workout);
	});
  }


  workouts(){
	this.router.navigate(['/workouts']);
  }

  home(){
	this.router.navigate(['/menu']);
  }

}
