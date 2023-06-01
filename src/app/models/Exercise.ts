import { Subject } from "rxjs";
import { makeid } from "./randomid";
import { Injectable } from '@angular/core';
import { WorkoutModel } from "./Workouts";


export class ExerciseVO{
	id:String = "";
	constructor(){
		this.id = makeid(20);
	}

	name:String = "";
	isReps:boolean = true;
	isDuration:boolean = false;
	repsDefault:number = 12;
	durationDefault:number = 30;
	isBodyweight:boolean = false;
	weightDefault:number = 20;
	isFree:boolean = false;
	sets:number = 0;
	successes:Array<boolean> = [];

	clone(): ExerciseVO {
		const clonedExercise = new ExerciseVO();
		clonedExercise.id = this.isFree ? makeid(20) : this.id;
		clonedExercise.name = this.name;
		clonedExercise.isReps = this.isReps;
		clonedExercise.isDuration = this.isDuration;
		clonedExercise.repsDefault = this.repsDefault;
		clonedExercise.durationDefault = this.durationDefault;
		clonedExercise.isBodyweight = this.isBodyweight;
		clonedExercise.weightDefault = this.weightDefault;
		clonedExercise.isFree = this.isFree;
		clonedExercise.sets = this.sets;
		clonedExercise.successes = this.successes;
	
		return clonedExercise;
	  }

	 static from(o:any):ExerciseVO{
		var s = new ExerciseVO();

		for (const key in o) {
			if (o.hasOwnProperty(key) && typeof o[key] !== 'undefined') {
			  Object(s)[key] = o[key];
			}
		  }
		  
		return s;
	  }
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseModel{

	constructor(
	){
		var exercises = window.localStorage.getItem("exercises");
		if (exercises && JSON.parse(exercises).length > 0){
			this.exercises = [];
			JSON.parse(exercises).forEach((e: any) => {
				this.exercises.push(ExerciseVO.from(e));
			});
		}
	}

	getExerciseByName(name:String): ExerciseVO {
		var list = this.exercises.filter(exercise => exercise.name === name);
		if (list.length > 0)
			return list[0];
		return this.createBlankExercise();
	}

	public exercisesChanged:Subject<boolean> = new Subject<boolean>();
	private exercises:Array<ExerciseVO> = [ExerciseVO.from({
		id: "Rest",
		name: "Rest",
		isReps:false,
		isDuration: true,
		durationDefault: 90,
		isFree: true,
		isBodyweight: true
	})];

	getExercises():Array<ExerciseVO>{
		return JSON.parse(JSON.stringify(this.exercises));
	}

	deleteExercise(name:String){
		this.exercises = this.exercises.filter(exercise => exercise.id == "Rest" || exercise.name !== name);
		this.exercisesChanged.next(true);
		this.save();
	}

	createBlankExercise():ExerciseVO{
		var exercise = new ExerciseVO();
		exercise.name = "Exercise-" + this.exercises.length;
		this.exercises.push(exercise);
		this.save();
		return exercise;
	}

	updateExercise(name:String, updated:ExerciseVO){
		for (var index in this.exercises){
			if (this.exercises[index].name === name){
				this.exercises[index] = updated;
			}
		}
		this.exercisesChanged.next(true);
		this.save();
	}

	save(){
		window.localStorage.setItem("exercises", JSON.stringify(this.exercises));
	}
}