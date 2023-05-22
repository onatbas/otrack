import { Component, Input, OnInit } from '@angular/core';
import { ExerciseModel, ExerciseVO } from '../../models/Exercise';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.css']
})
export class ExerciseListItemComponent implements OnInit {

  constructor(
	private model:ExerciseModel,
	private router:Router
  ) { }

  @Input() edit:boolean = false;

  @Input() exercise:ExerciseVO = {
	  name: "",
	  isReps: false,
	  isDuration: false,
	  repsDefault: 0,
	  durationDefault: 0,
	  isBodyweight: false,
	  weightDefault: 0,
	  isFree: false,
	  sets: []
  };

  ngOnInit(): void {
  }

  info(){
	
  }

  editItem(){
	this.router.navigate(['/editExercise', {name: this.exercise.name}]);
  }

  delete(){
	this.model.deleteExercise(this.exercise.name);
	
  }
}
