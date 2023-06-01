import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetVO, WorkoutModel, WorkoutVO } from 'src/app/models/Workouts';
import {Location} from '@angular/common';

class SetSearchVO{
	id:String = "";
	name:String = "";
	workout:String = "";
}

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {

  constructor(
	private location:Location,
	private route:ActivatedRoute,
	private router:Router,
	private workoutModel:WorkoutModel
  ) { }

  editMode:boolean = this.workoutModel.getEditMode();

  setSearchText:string = "";
  candidates:Array<SetSearchVO> = [];

  ngOnInit(): void {
	this.route.params.subscribe(params => {

		this.loadWorkout(params['name']);

		this.workoutName = this.workout.name;
 	 });
  }

  workout:WorkoutVO = new WorkoutVO();
  workoutName:String = "";

  loadWorkout(name:string){
	this.workout = this.workoutModel.getWorkoutByName(name);
	const borrowables = this.workoutModel.getBorrowableSets();
	this.workout.sets = this.workout.sets.map(set =>{
		if (!set.isBorrowed)	return set;
		else{
			var borrowedSet = SetVO.from({
				...borrowables.filter(borrowable => borrowable.name === set.name)[0],
				isBorrowed: true,
				isBorrowable: false,
				userAssignedName: set.userAssignedName
			})
			return borrowedSet;
		}
	})
  }

  save(){
	this.workoutModel.updateWorkout(this.workoutName, this.workout);
  }

  delete(){
	this.workoutModel.deleteWorkout(this.workoutName);
	this.back();
  }

  back(){
	this.location.back();
  }

  edit(){
	this.editMode = this.workoutModel.toggleEditMode();
  }

  deleteSet(name:String){
	this.workout.sets = this.workout.sets.filter(set=> set.isBorrowable || set.name !== name);
	this.save();
  }

  addSet(){
	this.workout.sets.push(new SetVO());
  }

  start(){
	console.log("starting workout..");
	this.save();
	this.loadWorkout(this.workout.name.toString());
	this.router.navigate(['executeWorkout', {state: JSON.stringify({workout: this.workout})}]);
  }

  onSearchChange(e:Event){
	this.candidates = [];
	if (this.setSearchText.length > 1){
		const workouts = this.workoutModel.getWorkouts();
		for (let wIndex = 0; wIndex < workouts.length; wIndex++) {
			const workout = workouts[wIndex];
			for (let sIndex = 0; sIndex < workout.sets.length; sIndex++) {
				const set = workout.sets[sIndex];
				
				if(set.isBorrowable && set.userAssignedName.toLowerCase().includes(this.setSearchText.toLowerCase())){
					var searchResult = new SetSearchVO();
					searchResult.id = set.name;
					searchResult.workout = workout.name;
					searchResult.name = set.userAssignedName;
					this.candidates.push(searchResult);
				}
			}
		}
	}
  }

  chooseBySearch(id:String){
	const borrowed = this.candidates.filter(can=>can.id === id)[0];
	var set = new SetVO();
	set.name = id;
	set.userAssignedName = borrowed.name + " (" + borrowed.workout + ")";
	set.isBorrowable = false;
	set.isBorrowed = true;
	this.workout.sets.push(set);
	this.setSearchText = "";
	this.candidates = [];
  }
}

