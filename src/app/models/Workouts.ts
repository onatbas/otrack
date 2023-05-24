import { Subject } from "rxjs";
import { ExerciseModel, ExerciseVO } from "./Exercise";
import { makeid } from "./randomid";
import { OnInit } from "@angular/core";
import { Injectable } from '@angular/core';

export class SetVO {
	name:String = "";
	repeats:number = 1;
	exercises:Array<ExerciseVO> = [];

	constructor(
	){
		this.name = makeid(20);
	}
}

export class WorkoutVO {
	name:String = "";
	sets:Array<SetVO> = [];
}


@Injectable({
  providedIn: 'root'
})
export class WorkoutModel implements OnInit{

	constructor(
		private exerciseModel:ExerciseModel
	){
	this.workouts = [
			{name: "Kettlebell HIIT", sets:[
				{name: "randomSetName-1", repeats: 2, exercises:[
					this.exerciseModel.getExerciseByName("Cossack Squat").clone(),
					this.exerciseModel.getExerciseByName("Barbell Curl").clone()]},
				{name: "randomSetName-2", repeats: 2, exercises:[
					this.exerciseModel.getExerciseByName("Cossack Squat").clone()
				]}
			]},
		]
	}
	
	ngOnInit(): void {
	}

	setExerciseInstance(id:String, e:ExerciseVO){
		for (let i in this.workouts){
			for (let j in this.workouts[i].sets){
				for (let k in this.workouts[i].sets[j].exercises){
					if (this.workouts[i].sets[j].exercises[k].id === id){
						this.workouts[i].sets[j].exercises[k] = e;
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
		for (var index in this.workouts){
			if (this.workouts[index].name === workoutName){
				this.workouts[index] = workout;
				return;
			}
		}
		this.workoutsChanged.next(true);
	}
	
	getWorkoutByName(name:String): WorkoutVO {
		var list = this.workouts.filter(workout => workout.name === name);
		if (list.length > 0)
			return JSON.parse(JSON.stringify(list[0]));
		return this.createBlankWorkout();
	}

	createBlankWorkout() {
		var workout = new WorkoutVO();
		workout.name = "Workout-" + this.workouts.length;
		this.workouts.push(workout);
		return workout;
	}

	public workoutsChanged:Subject<boolean> = new Subject<boolean>();
	private workouts:Array<WorkoutVO> =  [];

	getWorkouts():Array<WorkoutVO>{
		return JSON.parse(JSON.stringify(this.workouts));
	}

	deleteWorkout(name: any) {
		this.workouts = this.workouts.filter(workout => workout.name !== name);
		this.workoutsChanged.next(true);
	}
}