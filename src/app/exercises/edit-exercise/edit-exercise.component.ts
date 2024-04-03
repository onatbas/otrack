import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseModel, ExerciseVO } from 'src/app/models/Exercise';
import { Location } from '@angular/common';
import { WorkoutModel } from 'src/app/models/Workouts';
import { EquipmentModel, EquipmentVO } from 'src/app/models/Equipment';

@Component({
	selector: 'app-edit-exercise',
	templateUrl: './edit-exercise.component.html',
	styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private exerciseModel: ExerciseModel,
		private workoutModel: WorkoutModel,
		private equipmentModel: EquipmentModel,
		private location: Location
	) { }

	exerciseName: String = "";
	exercise: ExerciseVO = new ExerciseVO();
	instanced:boolean = false;
	saveExerciseGlobal:boolean = false;
	goBackOnSave:boolean = false;
	equipment:string[] = [];

	ngOnInit(): void {
		this.equipment = this.equipmentModel.getEquipment().map(eq => eq.name);
		this.route.params.subscribe(params => {
			this.instanced = params['instanced'];
			console.log(this.instanced)
			if (this.instanced)
				this.exercise = this.workoutModel.getExerciseInstance(params['id']);
			else
				this.exercise = this.exerciseModel.getExerciseByName(params['name']);

			this.exerciseName = this.exercise.name;

			this.saveExerciseGlobal = params["saveExerciseGlobal"];
			this.goBackOnSave = params["goBackOnSave"];
		});
	}

	back() {
		this.location.back();
	}

	save() {
		if (this.instanced){
			this.workoutModel.setExerciseInstance(this.exercise.id, this.exercise);

			if (this.saveExerciseGlobal){
				this.exerciseModel.updateExercise(this.exerciseModel.createBlankExercise().name, this.exercise);
			}
		}else
			this.exerciseModel.updateExercise(this.exercise.name, this.exercise);

			if (this.goBackOnSave)
			this.back();
	}

	delete() {
		this.exerciseModel.deleteExercise(this.exerciseName);
		this.back();
	}

	repsChanged(event: MatTabChangeEvent) {
		console.log("Reps: ", this.exercise.isReps);
		this.exercise.isReps = event.index === 0;
		this.exercise.isDuration = !this.exercise.isReps;
	}

	weightednessChanged(event: MatTabChangeEvent) {
		this.exercise.isBodyweight = event.index === 0;
	}

	freenessChanged(event: MatTabChangeEvent) {
		this.exercise.isFree = event.index === 0;
	}

	changeRep(num: number) {
		this.exercise.repsDefault += num;
	}
	changeDur(num: number) {
		this.exercise.durationDefault += num;
	}

	changeSets(num: number) {
		this.exercise.sets += num;
	}

	changeWeight(num: number) {
		this.exercise.weightDefault += num;
	}

	getUnit(){
		return this.equipmentModel.getEquipmentByName(this.exercise.equipment).unit;
	}
}
