import { Subject } from "rxjs";
import { ExerciseModel, ExerciseVO } from "./Exercise";
import { makeid } from "./randomid";
import { OnInit } from "@angular/core";
import { Injectable } from '@angular/core';
import { WorkoutStateStageInfo } from "../execute-workout/WorkoutState";

export class SetVO {
	name:String = "";
	repeats:number = 1;
	exercises:Array<ExerciseVO> = [];

	userAssignedName:String = "";
	isBorrowable:boolean = false;
	isBorrowed:boolean = false;

	constructor(
	){
		this.name = makeid(20);
	}

	static from(o:any):SetVO{

		var s = new SetVO();
		for (let key in o){
			Object(s)[key] = o[key];
		}

		if (o.exercises)
			s.exercises = o.exercises.map((set:any) => ExerciseVO.from(set));

		return s;
	}
}


export enum SuccessStates {
	SUCCESS = "success",
	NONE = "none",
	FAIL = "fail"
}

export class WorkoutVO {
	name:String = "";
	sets:Array<SetVO> = [];
	archive: Array<WorkoutStateStageInfo> = [];
	successState: SuccessStates = SuccessStates.NONE;
	completionDate: string = "N/A";


	static from(o:any):WorkoutVO{
		var s = new WorkoutVO();
		s.name = o.name;
		
		if (o.sets)
			s.sets = o.sets.map((set:any) => SetVO.from(set));
		if (o.archive)
			s.archive = o.archive.map((archived:any) => WorkoutStateStageInfo.from(archived));
		if (o.successState)
			s.successState = o.successState;
		if (o.completionDate)
			s.completionDate = o.completionDate;
		return s;
	}
}


@Injectable({
  providedIn: 'root'
})
export class WorkoutModel implements OnInit{

	private editMode:boolean = false;
	getEditMode(): boolean {
		return this.editMode;
	}

	toggleEditMode(): boolean{
		this.editMode = !this.editMode;
		return this.getEditMode();
	}

	constructor(
		private exerciseModel:ExerciseModel
	){
		var workouts = window.localStorage.getItem("workouts");
		if (workouts && JSON.parse(workouts).length > 0){
			this.workouts = [];
			JSON.parse(workouts).forEach((e: any) => {
				this.workouts.push(WorkoutVO.from(e));
			});
		}
	}
	
	ngOnInit(): void {
	}

	setExerciseInstance(id:String, e:ExerciseVO){
		for (let i in this.workouts){
			for (let j in this.workouts[i].sets){
				for (let k in this.workouts[i].sets[j].exercises){
					if (this.workouts[i].sets[j].exercises[k].id === id){
						this.workouts[i].sets[j].exercises[k] = e;
						window.localStorage.setItem("workouts", JSON.stringify(this.workouts));
						return;
					}
				}
			}
		}
	}
	
	getExerciseInstance(id:String):ExerciseVO{
		for (let i in this.workouts){
			for (let j in this.workouts[i].sets){
				for (let k in this.workouts[i].sets[j].exercises){
					if (this.workouts[i].sets[j].exercises[k].id === id){
						return this.workouts[i].sets[j].exercises[k];
					}
				}
			}
		}
		return this.exerciseModel.getExerciseByName("Rest").clone();
	}

	updateWorkout(workoutName: String, workout: WorkoutVO) {

		for (let sIndex = 0; sIndex < workout.sets.length; sIndex++) {
			const set = workout.sets[sIndex];
			if (set.isBorrowed && set.exercises.length > 0){
				this.updateBorrowedSet(set);
			}
		}

		for (var index in this.workouts){
			if (this.workouts[index].name === workoutName){
				this.workouts[index] = workout;
				window.localStorage.setItem("workouts", JSON.stringify(this.workouts));
				return;
			}
		}

		this.workoutsChanged.next(true);

	}

	updateBorrowedSet(borrowedSet:SetVO){
		for (let wIndex = 0; wIndex < this.workouts.length; wIndex++) {
			const workout = this.workouts[wIndex];
			
			for (let sIndex = 0; sIndex < workout.sets.length; sIndex++) {
				const set = workout.sets[sIndex];
				
				if (set.name === borrowedSet.name)
				this.workouts[wIndex].sets[sIndex].exercises = borrowedSet.exercises;
			}
		}
	}

	getWorkoutByName(name:String): WorkoutVO {
		console.log("getWorkoutByName..");
		var list = this.workouts.filter(workout => workout.name === name);
		if (list.length > 0)
			return JSON.parse(JSON.stringify(list[0]));
		return this.createBlankWorkout();
	}

	createBlankWorkout() {
		var workout = new WorkoutVO();
		workout.name = "Workout-" + this.workouts.length;
		this.workouts.push(workout);
		window.localStorage.setItem("workouts", JSON.stringify(this.workouts));
		return workout;
	}

	public workoutsChanged:Subject<boolean> = new Subject<boolean>();
	private workouts:Array<WorkoutVO> =  [];

	getWorkouts():Array<WorkoutVO>{
		return JSON.parse(JSON.stringify(this.workouts));
	}

	deleteWorkout(name: any) {
		this.workouts = this.workouts.filter(workout => workout.name !== name);
		window.localStorage.setItem("workouts", JSON.stringify(this.workouts));
		this.workoutsChanged.next(true);
	}

	getBorrowableSets():Array<SetVO>{
		var result: Array<SetVO> = [];
		for (let wIndex = 0; wIndex < this.workouts.length; wIndex++) {
			const workout = this.workouts[wIndex];
			
			for (let sIndex = 0; sIndex < workout.sets.length; sIndex++) {
				const set = workout.sets[sIndex];
				
				if (set.isBorrowable)
					result.push(set);
			}
		}
		return result;
	}
}