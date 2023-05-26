import { Subject } from "rxjs";
import { makeid } from "./randomid";
import { Injectable } from '@angular/core';
import { WorkoutModel } from "./Workouts";

export class SetVO{
	weight: number = 10;
	reps: number = 12;
	success: boolean = true;

	id:String = "";
	constructor(){
		this.id = makeid(20);
	}

	clone():SetVO {
		var clonedSet = new SetVO();
		clonedSet.weight = this.weight;
		clonedSet.reps = this.reps;
		clonedSet.id = makeid(20);
		return clonedSet;
	  }

	 static from(o:any):SetVO{
		var s = new SetVO();
		for (let key in o){
			Object(s)[key] = o[key];
		}
		return s;
	  }
}

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
	sets:Array<SetVO> = [];

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
		clonedExercise.sets = this.sets.map((set) => set.clone());
	
		return clonedExercise;
	  }

	 static from(o:any):ExerciseVO{
		var s = new ExerciseVO();

		s.id = o.id;
		s.name = o.name;
		s.isReps = o.isReps;
		s.isDuration = o.isDuration;
		s.repsDefault = o.repsDefault;
		s.durationDefault = o.durationDefault;
		s.isBodyweight = o.isBodyweight;
		s.weightDefault = o.weightDefault;
		s.isFree = o.isFree;

		if (o.sets)
			s.sets = o.sets.map((set:any) => SetVO.from(set));
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

	private exercises:Array<ExerciseVO> = [
		ExerciseVO.from({
			id: "Rest",
			name: "Rest",
			isReps:false,
			isDuration: true,
			durationDefault: 90,
			isFree: true,
			isBodyweight: true
		}),
		ExerciseVO.from({
			id:"asdafagef",
			name: "Barbell Curl",
			isReps: true,
			isDuration: false,
	
			repsDefault: 10,
			durationDefault: 10,
	
			isBodyweight: false,
			weightDefault: 20,
	
			isFree: false,
			sets: [
				SetVO.from({id:"123a", weight: 10, reps: 12}),
				SetVO.from({id:"123e", weight: 20, reps: 12})
			]
		}),
		ExerciseVO.from({
			id:"cocasksuqt",
			name: "Cossack Squat",
			isReps: false,
			isDuration: true,
			repsDefault: 10,
			durationDefault: 30,
			isBodyweight: true,
			weightDefault: 20,
			isFree: true,
			sets: []
		})
	  ];

	public exercisesChanged:Subject<boolean> = new Subject<boolean>();

	getExercises():Array<ExerciseVO>{
		return JSON.parse(JSON.stringify(this.exercises));
	}

	deleteExercise(name:String){
		this.exercises = this.exercises.filter(exercise => exercise.name !== name);
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