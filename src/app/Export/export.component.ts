import { Component, OnInit } from '@angular/core';
import { WorkoutModel, WorkoutVO } from '../models/Workouts';
import { ExerciseModel, ExerciseVO } from '../models/Exercise';
import {Clipboard} from '@angular/cdk/clipboard';
import { Location } from '@angular/common';
import { EquipmentModel, EquipmentVO } from '../models/Equipment';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(
	private workout:WorkoutModel,
	private exercise:ExerciseModel,
	private equipment:EquipmentModel,
	private clipboard: Clipboard,
	private location:Location
  ) { }

  includeExercises:boolean = true;
  includeWorkouts:boolean = true;
  includeEquipment:boolean = true;

  content:String = "";

  workoutChosen:Map<String, boolean> = new Map<String, boolean>();
  workouts:Array<WorkoutVO> = [];
  exercises:Array<ExerciseVO> = [];
  equipments:Array<EquipmentVO> = [];

  ngOnInit(): void {
	this.workouts = this.workout.getWorkouts();
	this.exercises = this.exercise.getExercises();
	this.equipments = this.equipment.getEquipment();

	this.workouts.forEach(w =>
		this.workoutChosen.set(w.name, true));
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

  toggleIncludeEquipment(){
	this.includeEquipment = !this.includeEquipment;
	this.createContent();
  }

  createContent(){
	var object:any = {};
	if (this.includeWorkouts)
	object.workouts = this.workouts.filter(w=>this.workoutChosen.get(w.name) == true);
	if (this.includeExercises)
	object.exercises = this.exercises;
	if (this.includeEquipment)
	object.equipment = this.equipments;

	this.content = JSON.stringify(object);
  }

  toggleChosen(name:String, refresh: boolean = true){
	this.workoutChosen.set(
		name,
		!this.workoutChosen.get(name)
	)
		if (refresh)
			this.createContent();

};

	toggleAll(){
		this.workouts.forEach(w =>
			this.toggleChosen(w.name, false));
		
		this.createContent();

	}
}
