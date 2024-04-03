import { Component, Inject, OnInit } from '@angular/core';
import { ExerciseModel, ExerciseVO } from '../models/Exercise';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-exercises',
	templateUrl: './exercises.component.html',
	styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

	constructor(
		private exerciseModel: ExerciseModel,
		private router: Router,
		private location: Location
	) {
	}

	exercises: Array<ExerciseVO> = this.exerciseModel.getExercises();
	editMode: boolean = false;

	ngOnInit(): void {
		this.exerciseModel.exercisesChanged.subscribe(() => {
			this.exercises = this.exerciseModel.getExercises();
		});
	}

	back() {
		this.location.back();
	}

	edit() {
		this.editMode = !this.editMode;
	}

	new() {
		this.router.navigate(['/editExercise', { name: this.exerciseModel.createBlankExercise().name }]);
	}
}
