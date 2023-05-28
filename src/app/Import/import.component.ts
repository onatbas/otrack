

import { Component, OnInit } from '@angular/core';
import { WorkoutModel, WorkoutVO } from '../models/Workouts';
import { ExerciseModel, ExerciseVO } from '../models/Exercise';
import { Clipboard } from '@angular/cdk/clipboard';
import { Location } from '@angular/common';


@Component({
	selector: 'app-import',
	templateUrl: './import.component.html',
	styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
	constructor(
		private workout: WorkoutModel,
		private exercises: ExerciseModel,
		private clipboard: Clipboard,
		private location: Location
	) { }

	includeExercises: boolean = true;
	includeWorkouts: boolean = true;

	content: string = "";

	workoutList: Array<WorkoutVO> = [];
	exerciseList: Array<ExerciseVO> = [];

	ngOnInit(): void {
	}

	home() {
		this.location.back();
	}

	paste() {
		this.parseContent();
	}

	toggleIncludeExercises() {
		this.includeExercises = !this.includeExercises;
		this.parseContent();
	}

	toggleIncludeWorkouts() {
		this.includeWorkouts = !this.includeWorkouts;
		this.parseContent();
	}

	parseContent() {
		var object: any = JSON.parse(this.content);

		if (this.includeWorkouts && object.workouts)
			this.workoutList = object.workouts;
		else
			this.workoutList = [];

		if (this.includeExercises && object.exercises)
			this.exerciseList = object.exercises;
		else
			this.exerciseList = [];
	}

	submit() {
		if (this.includeWorkouts && this.workoutList) {
			for (let index in this.workoutList) {
				var w: WorkoutVO = WorkoutVO.from(this.workoutList[index]);
				this.workout.updateWorkout(this.workout.getWorkoutByName(w.name).name, w);
			}


			if (this.includeExercises && this.exerciseList) {
				for (let index in this.exerciseList) {
					var e: ExerciseVO = ExerciseVO.from(this.exerciseList[index]);
					this.exercises.updateExercise(this.exercises.getExerciseByName(e.name).name, e);
				}
			}
		}
	}
}