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
		private location: Location
	) { }

	percentage: number = 0;
	nextText: String = "";
	success: boolean = true;
	final:boolean = false;

	successes:{ [key: string]: any[] } = {}; // Define successes as an object with string keys and array values

	//map. id to success array.
	
	state: WorkoutState = WorkoutState.from({
		workout: {
			name: "Dummy Workout",
			sets: [
				{
					name: "Set1",
					repeats: 2,
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
				}, {
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
		stages: []
	});

	currentStage: WorkoutStateStageInfo = new WorkoutStateStageInfo;
	currentExercise: ExerciseVO = new ExerciseVO;

	timer: any = null;

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			console.log(params['state']);
			if (! params['state']){
				this.location.back();
			}else{
				this.state = WorkoutState.from(JSON.parse(params['state']));
			}

			if (this.state.stages.length>0)
				this.currentStage = this.state.stages[this.state.stages.length-1];
			else
				this.state.stages.push(this.currentStage);
			this.processStage(this.state.stages.length - 1);

			console.log(this.currentStage);

			if (this.timer == null)
				this.timer = setInterval(() => {
					this.currentStage.time++;
					this.checktime();
				}, 1000);
		});
	}

	checktime() {

	}

	back() {
		this.location.back();
	}

	cancel() {
		this.router.navigate(['/menu']);
	}

	toggleSuccess() {
		this.success = !this.success;
	}

	addWeight(num: number) {
		this.currentExercise.weightDefault += num;
	}

	addReps(num: number) {
		this.currentExercise.repsDefault += num;
	}

	proceed() {
		this.successes[this.currentExercise.id.toString()].push(this.success);

		for (let i in this.state.workout.sets) {
			var sets = this.state.workout.sets[i];
			for (let j in sets.exercises) {
				var exercises = sets.exercises[j];
				if (exercises.id == this.currentExercise.id) {
					this.state.workout.sets[i].exercises[j].weightDefault = this.currentExercise.weightDefault;
					this.state.workout.sets[i].exercises[j].repsDefault = this.currentExercise.repsDefault;
					//					return;
					this.state.workout.sets[i].exercises[j].successes = this.successes[this.currentExercise.id.toString()];
				}

			}
		}

		console.log("This is the current stage stack: ", this.state.stages );

		var newIndex = WorkoutStateStageInfo.from(this.currentStage);
		newIndex.start = this.currentStage.time;
		newIndex.time = this.currentStage.time;
		newIndex.end = 0;

		if (this.state.stages.length > 0) {
			const currIndex = this.state.stages.length - 1;
			this.state.stages[currIndex] = WorkoutStateStageInfo.from(this.currentStage);
			this.state.stages[currIndex].end = this.currentStage.time;
		}


		this.state.stages.push(newIndex);


		console.log("This after modification stack: ", this.state.stages );


		if (!this.final)
			this.router.navigate(['/executeWorkout', { state: JSON.stringify(this.state) }]);
		else
			this.router.navigate(['/successWorkout', { state: JSON.stringify(this.state) }]);
		
	}


	processStage(stageNum: number) {

		console.log("stageNum: ", stageNum);

		var exercises_list: Array<ExerciseVO> = [];

		for (let i in this.state.workout.sets) {
			for (let x = 0; x < this.state.workout.sets[i].repeats; x++)
				for (let k in this.state.workout.sets[i].exercises) {
					if (stageNum == 0 )
					this.state.workout.sets[i].exercises[k].successes = [];
					const _exercise = this.state.workout.sets[i].exercises[k];
					this.successes[_exercise.id.toString()] =  _exercise.successes;
					if (_exercise.isFree) {
						exercises_list.push(_exercise);
					} else {
						for (let numSets=0; numSets< _exercise.sets; numSets++) {
							exercises_list.push(ExerciseVO.from({
								..._exercise,
							}));
						}
					}
				}
		}

		this.percentage = Math.min(100, Math.max(0, 100 * stageNum / (exercises_list.length-1)));

		console.log(exercises_list);
		console.log(stageNum);
		this.currentExercise = exercises_list[stageNum];

		if (exercises_list.length-1 == stageNum){
			this.nextText = "Final";
			this.final = true;
		} else {
			this.final = false;
			const next = exercises_list[stageNum+1];
			this.nextText = (next.isDuration ? next.durationDefault + "s" : next.repsDefault + "x") +
				" " + (next.isBodyweight ? "" : next.weightDefault + "kg ") + next.name;
		}
	}
}
