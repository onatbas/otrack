import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkoutState, WorkoutStateStageInfo } from './WorkoutState';
import { WorkoutVO } from '../models/Workouts';
import { ExerciseVO } from '../models/Exercise';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EquipmentModel, EquipmentVO } from '../models/Equipment';

@Component({
	selector: 'app-execute-workout',
	templateUrl: './execute-workout.component.html',
	styleUrls: ['./execute-workout.component.css']
})
export class ExecuteWorkoutComponent implements OnInit {

	audioPath: string;
	audioContext!: AudioContext;
	buffer!: AudioBuffer;
	source!: AudioBufferSourceNode;
	safeSrc: SafeResourceUrl;
	debugLogs:Array<string> = [];
	equipment: EquipmentVO = EquipmentVO.from({
		unit: "kg"
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private sanitizer: DomSanitizer,
		private equipmentModel: EquipmentModel
	) {

		this.audioPath = window.location.origin + '/assets/pop.mp3';
		if (window.location.origin.includes("github")) {
			this.audioPath = window.location.origin + '/otrack/assets/pop.mp3';
		}
		this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.audioPath);
		this.initAudio();
		document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
	}

	logDebug(msg:string){
		this.debugLogs.unshift(msg);
	}

	handleVisibilityChange() {
		if (!document.hidden) {
			if (this.audioContext.state === 'suspended') {
				this.audioContext.resume().then(() => {
					console.log('Audio context resumed successfully.');
				});
			} else if (this.audioContext.state === 'closed') {
				this.initAudio();
				console.log('Audio context recreated successfully.');
			}
		}
	}

	initAudio() {
		this.logDebug("init audio");
		this.audioContext = new window.AudioContext();
		this.buffer = this.audioContext.createBuffer(1, 1, 22050);
		this.source = this.audioContext.createBufferSource();
	}

	audioEnabled: boolean = false;
	message: String = "";

	percentage: number = 0;
	nextText: String = "";
	success: boolean = true;
	final: boolean = false;
	showHelp: boolean = false;
	stack:string="";

	successes: { [key: string]: any[] } = {}; // Define successes as an object with string keys and array values

	//map. id to success array.

	state: WorkoutState = WorkoutState.from({
		workout: {
			name: "Dummy Workout",
			sets: []
		},
		stages: []
	});

	currentStage: WorkoutStateStageInfo = new WorkoutStateStageInfo;
	currentExercise: ExerciseVO = new ExerciseVO;

	startTimestamp: number = 0;
	timer: any = null;

	ngOnDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			console.log(params['state']);
			if (!params['state']) {
				this.location.back();
			} else {
				this.state = WorkoutState.from(JSON.parse(params['state']));
			}

			if (this.state.stages.length > 0)
				this.currentStage = this.state.stages[this.state.stages.length - 1];
			else
				this.state.stages.push(this.currentStage);
			this.processStage(this.state.stages.length - 1);

			console.log(this.currentStage);
			if (this.startTimestamp == 0)
				this.startTimestamp = Date.now();

			if (this.timer == null)
				this.timer = setInterval(() => {
					this.updateTime();
				}, 1000);

			this.equipment = this.equipmentModel.getEquipmentByName(this.currentExercise.equipment);
			let plates = this.equipment.findPlatesForWeight(this.currentExercise.weightDefault);
			if (plates && !this.currentExercise.isBodyweight && plates.length > 0 )
				this.stack = "(" + this.equipment.name + ": " + this.equipment.numberArrayToString(plates) + ")";
			else
				this.stack = "";
		});
	}

	diff:number = 0;
	updateTime() {
		this.logDebug("Update time..");
		const now = Date.now();
		const elapsed = Math.floor((now - this.startTimestamp) / 1000);
		this.logDebug("currentStage.time: " + this.currentStage.time +
			"\n now: " + now + ", elapsed: " + elapsed);

		this.diff = elapsed;

		this.currentStage.time = elapsed;
		this.checktime();
	}

	checktime() {
		const countdown = this.currentExercise.durationDefault + this.currentStage.start - this.currentStage.time;
		this.logDebug("checktime" + ":dur: " + this.currentExercise.durationDefault + ", +start: "  + this.currentStage.start + ",  -time: " +  this.currentStage.time);
		if (this.currentExercise.isDuration && countdown < 5 && countdown >= 0){
			this.logDebug("playaudio");
			this.playAudio();
		}
	}

	showDebug: boolean = false;
	toggleDebug(){
		this.showDebug = !this.showDebug;
	}

	playAudio() {
		if (!this.audioEnabled || !this.currentExercise.isDuration)
			return;
			this.logDebug("playaudio inside.");

		var path = window.location.origin + '/assets/pop.mp3';
		if (window.location.origin.includes("github"))
			path = window.location.origin + '/otrack/assets/pop.mp3';

		var context = this.audioContext;
		var request = new XMLHttpRequest();
		this.message = 'Playing ' + path;
		request.open('GET', path, true);
		request.responseType = 'arraybuffer';
		request.addEventListener('load', function (e) {
			context.decodeAudioData(this.response, function (buffer) {
				var source = context.createBufferSource();
				source.buffer = buffer;
				source.connect(context.destination);
				source.start(0);
			});
		}, false);
		request.send();
		this.checkAndLoadAudio();
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

	checkAndLoadAudio() {
		this.logDebug("checkAndLoadAudio");
		if (this.audioEnabled) {
			this.logDebug("checkAndLoadAudio inside");
			this.source.buffer = this.buffer;
			this.source.connect(this.audioContext.destination);
			this.source.start(0);
		}
	}

	toggleAudio() {
		this.audioEnabled = !this.audioEnabled;
		this.checkAndLoadAudio();
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
					this.state.workout.sets[i].exercises[j].successes = this.successes[this.currentExercise.id.toString()];
				}

			}
		}

		console.log("This is the current stage stack: ", this.state.stages);

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


		console.log("This after modification stack: ", this.state.stages);


		if (!this.final)
			this.router.navigate(['/executeWorkout', { state: JSON.stringify(this.state) }]);
		else
			this.router.navigate(['/successWorkout', { state: JSON.stringify(this.state), save: true }]);

	}


	processStage(stageNum: number) {

		console.log("stageNum: ", stageNum);

		var exercises_list: Array<ExerciseVO> = [];

		for (let i in this.state.workout.sets) {
			for (let x = 0; x < this.state.workout.sets[i].repeats; x++)
				for (let k in this.state.workout.sets[i].exercises) {
					if (stageNum == 0)
						this.state.workout.sets[i].exercises[k].successes = [];
					const _exercise = this.state.workout.sets[i].exercises[k];
					this.successes[_exercise.id.toString()] = _exercise.successes;
					if (_exercise.isFree) {
						exercises_list.push(_exercise);
					} else {
						for (let numSets = 0; numSets < _exercise.sets; numSets++) {
							exercises_list.push(ExerciseVO.from({
								..._exercise,
							}));
						}
					}
				}
		}

		this.percentage = Math.min(100, Math.max(0, 100 * stageNum / (exercises_list.length - 1)));

		console.log(exercises_list);
		console.log(stageNum);
		this.currentExercise = exercises_list[stageNum];

		if (exercises_list.length - 1 == stageNum) {
			this.nextText = "Final";
			this.final = true;
		} else {
			this.final = false;
			const next = exercises_list[stageNum + 1];
			this.nextText = (next.isDuration ? next.durationDefault + "s" : next.repsDefault + "x") +
				" " + (next.isBodyweight ? "" : next.weightDefault + "" + this.getExerciseUnit(next) + " ") + next.name;
		}
	}

	getExerciseUnit(exercise:ExerciseVO){
		return this.equipmentModel.getEquipmentByName(exercise.equipment).unit;
	}

	hour() {
		return this.currentStage.time < 3600 ? "" : Math.floor(this.currentStage.time / 3600);
	}


	toggleHelp() {

		//		searchText:string = "https://www.bing.com/images/search?q=clean-and-jerk";


		this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.bing.com/images/search?q=" + this.currentExercise.name);

		this.showHelp = !this.showHelp;
	}

}
