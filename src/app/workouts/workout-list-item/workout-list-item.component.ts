import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutModel } from 'src/app/models/Workouts';

@Component({
  selector: 'app-workout-list-item',
  templateUrl: './workout-list-item.component.html',
  styleUrls: ['./workout-list-item.component.css']
})
export class WorkoutListItemComponent implements OnInit {

  constructor(
	private router:Router,
	private model:WorkoutModel
  ) { }

  ngOnInit(): void {
	
  }

  @Input() workout:any;
  @Input() edit:boolean = false;

  delete(){
	this.model.deleteWorkout(this.workout.name);
  }

  editItem(){
	this.router.navigate(['/editWorkout', {name: this.workout.name}]);
  }

  info(){
	var state = { workout: this.workout,
	stages: this.workout.archive};
	this.router.navigate(['/successWorkout', {state: JSON.stringify(state)}]);
  }
}
