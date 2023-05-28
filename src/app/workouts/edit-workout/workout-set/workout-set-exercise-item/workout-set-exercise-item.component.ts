import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseModel, ExerciseVO } from 'src/app/models/Exercise';


export class MoveExerciseData{
	public from:number;
	public to:number;

	constructor(from:number, to:number){
		this.from = from;
		this.to = to;
	}
}

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
	@Output() moveExercise = new EventEmitter<MoveExerciseData>();
	@Input() editMode: boolean = false;
	@Input() setItem: ExerciseVO = new ExerciseVO();

	@Input() index:number = 0;
	@Input() total:Number = 0;

	ngOnInit(): void {}

	delete(){
		this.deleteExercise.emit(this.setItem.id);
	}

	edit(){
			this.router.navigate(['/editExercise', {id: this.setItem.id, instanced: true}]);
	}

	move(int:number){
		this.moveExercise.emit(new MoveExerciseData(this.index, this.index+int));
	}
}
