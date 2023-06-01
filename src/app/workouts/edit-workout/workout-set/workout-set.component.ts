import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExerciseModel, ExerciseVO } from 'src/app/models/Exercise';
import { SetVO } from 'src/app/models/Workouts';
import { MoveExerciseData } from './workout-set-exercise-item/workout-set-exercise-item.component';
import { makeid } from 'src/app/models/randomid';

@Component({
  selector: 'app-workout-set',
  templateUrl: './workout-set.component.html',
  styleUrls: ['./workout-set.component.css']
})
export class WorkoutSetComponent implements OnInit {

  @Output() deleteSet = new EventEmitter<String>();

  deleteSelf(){
	this.deleteSet.emit(this.set.name);
  }

  constructor(
	private exerciseModel:ExerciseModel
  ) {
  }

  @Input() set:SetVO = new SetVO();
  @Input() editMode:boolean = false;
  exerciseNames:Array<String> = [];

  selectedExercise = "Rest";

  ngOnInit(): void {
	this.exerciseNames = this.exerciseModel.getExercises().map(e=>e.name);
  }


  addExercise(){
	this.set.exercises.push(ExerciseVO.from({
		...this.exerciseModel.getExerciseByName(this.selectedExercise),
		id: makeid(22)
	}));
	this.deleteSet.emit(undefined);

}

  adjustReps(num:number){
	this.set.repeats += num;
  }

  deleteExerciseFromSet(id:String){
	this.set.exercises = this.set.exercises.filter(e => e.id !== id);
  }


  moveExerciseInSet(data:MoveExerciseData){
	let ex:ExerciseVO = this.set.exercises[data.to];
	this.set.exercises[data.to] = this.set.exercises[data.from];
	this.set.exercises[data.from] = ex;
  }
}
