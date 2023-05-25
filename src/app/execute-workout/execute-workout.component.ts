import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkoutState, WorkoutStateStageInfo } from './WorkoutState';
import { WorkoutVO } from '../models/Workouts';
import { ExerciseVO } from '../models/Exercise';
import { Location } from '@angular/common';

@Component({
	selector: 'app-execute-workout',
	templateUrl: './execute-workout.component.html',
	styleUrls: ['./execute-workout.component.css']
})
export class ExecuteWorkoutComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location:Location
	) { }

	percentage:number = 0;
	nextText:String = "";
	success:boolean = true;

	state: WorkoutState = WorkoutState.from({
		workout: {
			name: "Dummy Workout",
			sets: [
				{
					name: "Set1",
					repeats: 1,
					exercises: [
						ExerciseVO.from({
							name: "Bench Press",
							isFree: false,
							sets: [{
								weight: 20,
								reps: 10,
								id: "tankthebill1"
							}, {
								weight: 30,
								reps: 15,
								id: "tankthebill2"
							}]
						})
					]
				},{
					name: "set2",
					repeats: 1,
					exercises: [
						ExerciseVO.from({
							name: "Cossack Squat",
							isFree: true,
							isReps: false,
							isDuration: true,
							durationDefault: 45,
							isBodyweight: true
						})
					]
				}
			]
		},
		stages: [
			{
				time: 192,
				start: 192,
				end: 266
			},
			{
				time: 266,
				start: 242,
				end: 0
			}
		]
	});

	currentStage: WorkoutStateStageInfo = new WorkoutStateStageInfo;
	currentExercise: ExerciseVO = new ExerciseVO;

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			//this.state = params['state'];

			this.currentStage = this.state.stages[0];
			this.processStage(2);

			console.log(this.currentStage);

			setInterval(()=>{this.currentStage.time++; this.checktime()}, 1000);
		});
	}

	checktime(){

	}

	back(){
		this.location.back();
	}
	
	cancel(){

	}

	toggleSuccess(){
		this.success = !this.success;
	}
	
	addWeight(num:number){

	}

	

	processStage(stageNum: number) {

		var exercises_list: Array<ExerciseVO> = [];

		for (let i in this.state.workout.sets) {
			const _exercises = this.state.workout.sets[i].exercises;
			for (let k in _exercises) {
				const _exercise = _exercises[k];
				if (_exercise.isFree) {
					exercises_list.push(_exercise);
				} else {
					for (let numSets in _exercise.sets) {
						exercises_list.push(ExerciseVO.from({
							..._exercise,
							isReps: true,
							id: _exercise.sets[numSets].id,
							weightDefault: _exercise.sets[numSets].weight,
							repsDefault: _exercise.sets[numSets].reps
						}));
					}
				}
			}
		}

		this.percentage = Math.min(100, Math.max(0, 100*stageNum/exercises_list.length)); 

		console.log(exercises_list);
		console.log(stageNum);
		this.currentExercise = exercises_list[stageNum-1];
		this.nextText = "Rest 120 (changethis)"
	}
}
