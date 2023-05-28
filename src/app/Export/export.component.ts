import { Component, OnInit } from '@angular/core';
import { WorkoutModel } from '../models/Workouts';
import { ExerciseModel } from '../models/Exercise';
import {Clipboard} from '@angular/cdk/clipboard';
import { Location } from '@angular/common';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(
	private workout:WorkoutModel,
	private exercises:ExerciseModel,
	private clipboard: Clipboard,
	private location:Location
  ) { }

  includeExercises:boolean = true;
  includeWorkouts:boolean = true;

  content:String = "";

  ngOnInit(): void {
	this.createContent();
  }


  home(){
	this.location.back();
  }

  copy(){
	this.clipboard.copy(this.content.toString());
  }

  toggleIncludeExercises(){
	this.includeExercises = !this.includeExercises;
	this.createContent();
  }

  toggleIncludeWorkouts(){
	this.includeWorkouts = !this.includeWorkouts;
	this.createContent();
  }

  createContent(){
	var object:any = {};
	if (this.includeWorkouts)
	object.workouts = this.workout.getWorkouts();
	if (this.includeExercises)
	object.exercises = this.exercises.getExercises();

	this.content = JSON.stringify(object);
  }
}
