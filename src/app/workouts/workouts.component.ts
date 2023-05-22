import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { WorkoutModel, WorkoutVO } from '../models/Workouts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {

  constructor(
	private location:Location,
	private workoutModel: WorkoutModel,
	private router:Router
	) { }

   workouts:Array<WorkoutVO> = [];
   editMode:boolean = false;

  ngOnInit(): void {
	this.workouts = this.workoutModel.getWorkouts();
	this.workoutModel.workoutsChanged.subscribe(()=>{
		this.workouts = this.workoutModel.getWorkouts();
	});
  }


  edit(){
	this.editMode = !this.editMode;
  }

  new(){
	this.router.navigate(['/editWorkout', {name: this.workoutModel.createBlankWorkout().name}]);
  }


  back(){
	this.location.back();
  }

}
