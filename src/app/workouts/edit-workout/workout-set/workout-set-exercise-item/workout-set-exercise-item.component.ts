import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseModel, ExerciseVO } from 'src/app/models/Exercise';

@Component({
	selector: 'app-workout-set-exercise-item',
	templateUrl: './workout-set-exercise-item.component.html',
	styleUrls: ['./workout-set-exercise-item.component.css']
})
export class WorkoutSetExerciseItemComponent implements OnInit {

	constructor(
		private exerciseModel: ExerciseModel,
		private router:Router
	) { }

	@Output() deleteExercise = new EventEmitter<String>();
	@Input() editMode: boolean = false;
	@Input() setItem: ExerciseVO = new ExerciseVO();

	ngOnInit(): void {}

	delete(){
		this.deleteExercise.emit(this.setItem.id);
	}

	edit(){
			this.router.navigate(['/editExercise', {id: this.setItem.id, instanced: true}]);
	}
}
