import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExerciseModel } from 'src/app/models/Exercise';
import { SetVO } from 'src/app/models/Workouts';

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
	this.set.exercises.push(this.exerciseModel.getExerciseByName(this.selectedExercise).clone());
  }

  adjustReps(num:number){
	this.set.repeats += num;
  }

  deleteExerciseFromSet(id:String){
	this.set.exercises = this.set.exercises.filter(e => e.id !== id);
  }

}
