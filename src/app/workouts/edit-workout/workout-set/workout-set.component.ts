import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExerciseModel, ExerciseVO } from 'src/app/models/Exercise';
import { SetVO } from 'src/app/models/Workouts';
import { MoveExerciseData } from './workout-set-exercise-item/workout-set-exercise-item.component';
import { makeid } from 'src/app/models/randomid';
import { Router } from '@angular/router';

export class MoveSetData{
	public from:number;
	public to:number;

	constructor(_from:number, _to:number) {
		this.from = _from;
		this.to = _to;
	}
}

@Component({
  selector: 'app-workout-set',
  templateUrl: './workout-set.component.html',
  styleUrls: ['./workout-set.component.css']
})
export class WorkoutSetComponent implements OnInit {

  @Output() deleteSet = new EventEmitter<String>();
  @Output() moveSet = new EventEmitter<MoveSetData>();

  deleteSelf(){
	this.deleteSet.emit(this.set.name);
  }

  constructor(
	private exerciseModel:ExerciseModel,
	private router:Router
  ) {
  }

  @Input() set:SetVO = new SetVO();
  @Input() editMode:boolean = false;

  @Input() index:number = 0;
  @Input() total:number = 0;

  exerciseNames:Array<String> = [];
  searchText:String = "";
  candidates:Array<String> = [];

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


  onSearchChange(e:Event){
	if (this.searchText.length < 2)
		this.candidates = [];
	else
		this.candidates = this.exerciseNames.filter(name => name.toLowerCase().includes(this.searchText.toString().toLowerCase()));
  }

  chooseBySearch(choice:String){
	this.searchText = "";
	this.candidates = [];
	this.selectedExercise = choice.toString();
	this.addExercise();
  }

  addNewExercise(){
	const id = makeid(22);
	this.set.exercises.push(ExerciseVO.from({
		name: this.searchText,
		id: id
	}));
	this.deleteSet.emit(undefined);

	this.router.navigate(["/editExercise", {instanced: true, id: id, saveExerciseGlobal: true, goBackOnSave: true}]);
  }

  toggleIsBorrowable(){
	this.set.isBorrowable = !this.set.isBorrowable;
  }

  move(it:number){
	this.moveSet.emit(new MoveSetData(this.index, this.index+it));
  }
}
