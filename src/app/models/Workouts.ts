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

export class WorkoutVO {
	name:String = "";
	sets:Array<SetVO> = [];


	static from(o:any):WorkoutVO{
		var s = new WorkoutVO();
		s.name = o.name;
		
		if (o.sets)
			s.sets = o.sets.map((set:any) => SetVO.from(set));
		return s;
	}
}


@Injectable({
  providedIn: 'root'
})
export class WorkoutModel implements OnInit{

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
		for (var index in this.workouts){
			if (this.workouts[index].name === workoutName){
				this.workouts[index] = workout;
				window.localStorage.setItem("workouts", JSON.stringify(this.workouts));
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
}