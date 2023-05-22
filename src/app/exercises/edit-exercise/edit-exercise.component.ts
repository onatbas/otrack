import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseModel, ExerciseVO, SetVO } from 'src/app/models/Exercise';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {

  constructor(
	private route: ActivatedRoute,
	private router:Router,
	private exerciseModel:ExerciseModel,
	private location:Location
  ) { }

  exerciseName:String = "";
  sets:number = 0;
  exercise:ExerciseVO = new ExerciseVO();

  ngOnInit(): void {
	this.route.params.subscribe(params => {
		this.exercise = this.exerciseModel.getExerciseByName(params['name']);
		this.exerciseName = this.exercise.name;
		this.sets = this.exercise.sets.length;
 	 });
  }

  back(){
	this.location.back();
	}

  save(){
	var additionalSets = this.sets - this.exercise.sets.length;
	var set:SetVO = {
		weight: this.exercise.weightDefault,
		reps: this.exercise.repsDefault
	}
	while (additionalSets-- > 0){
		this.exercise.sets.push(set);
	}
	this.exerciseModel.updateExercise(this.exercise.name, this.exercise);
  }

  delete(){
	this.exerciseModel.deleteExercise(this.exerciseName);
	this.back();
  }

  repsChanged(event:MatTabChangeEvent){
	this.exercise.isReps = event.index === 0;
	this.exercise.isDuration = !this.exercise.isReps;
  }

  weightednessChanged(event:MatTabChangeEvent){
	this.exercise.isBodyweight = event.index === 0;
  }

  freenessChanged(event:MatTabChangeEvent){
	this.exercise.isFree = event.index === 0;
  }

  changeRep(num:number){
	this.exercise.repsDefault += num;
  }
  changeDur(num:number){
	this.exercise.durationDefault += num;
  }

  changeSets(num:number){
	this.sets += num;
  }

  changeWeight(num:number){
	this.exercise.weightDefault += num;
  }
}
