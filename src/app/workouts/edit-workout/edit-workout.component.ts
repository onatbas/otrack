import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetVO, WorkoutModel, WorkoutVO } from 'src/app/models/Workouts';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {

  constructor(
	private location:Location,
	private route:ActivatedRoute,
	private router:Router,
	private workoutModel:WorkoutModel
  ) { }

  editMode:boolean = false;

  ngOnInit(): void {
	this.route.params.subscribe(params => {
		this.workout = this.workoutModel.getWorkoutByName(params['name']);
		this.workoutName = this.workout.name;
 	 });
  }

  workout:WorkoutVO = new WorkoutVO();
  workoutName:String = "";

  save(){
	this.workoutModel.updateWorkout(this.workoutName, this.workout);
  }

  delete(){
	this.workoutModel.deleteWorkout(this.workoutName);
	this.back();
  }

  back(){
	this.location.back();
  }

  edit(){
	this.editMode = !this.editMode;
  }

  deleteSet(name:String){
	this.workout.sets = this.workout.sets.filter(set=>set.name !== name);
	this.save();
  }

  addSet(){
	this.workout.sets.push(new SetVO());
  }

  start(){
	this.router.navigate(['executeWorkout', {state: JSON.stringify({workout: this.workout})}]);
  }
}

