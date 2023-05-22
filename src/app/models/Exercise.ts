import { Subject } from "rxjs";

export class SetVO{
	weight: number = 10;
	reps: number = 12;
}

export class ExerciseVO{
	name:String = "";
	isReps:boolean = true;
	isDuration:boolean = false;
	repsDefault:number = 12;
	durationDefault:number = 30;
	isBodyweight:boolean = false;
	weightDefault:number = 20;
	isFree:boolean = false;
	sets:Array<SetVO> = [];

	public constructor(){
		
	}
}

export class ExerciseModel{
	getExerciseByName(name:String): ExerciseVO {
		var list = this.exercises.filter(exercise => exercise.name === name);
		if (list.length > 0)
			return list[0];
		return this.createBlankExercise();
	}

	private exercises:Array<ExerciseVO> = [
		{
			name: "Barbell Curl",
			isReps: true,
			isDuration: false,
	
			repsDefault: 10,
			durationDefault: 10,
	
			isBodyweight: false,
			weightDefault: 20,
	
			isFree: false,
			sets: [
				{weight: 10, reps: 12},
				{weight: 20, reps: 12},
				{weight: 30, reps: 12},
				{weight: 40, reps: 12},
				{weight: 50, reps: 12},
				{weight: 60, reps: 12}
			]
		},
		{
			name: "Cossack Squat",
			isReps: false,
			isDuration: true,
			repsDefault: 10,
			durationDefault: 30,
			isBodyweight: true,
			weightDefault: 20,
			isFree: true,
			sets: []
		}
	  ];

	public exercisesChanged:Subject<boolean> = new Subject<boolean>();

	getExercises():Array<ExerciseVO>{
		return JSON.parse(JSON.stringify(this.exercises));
	}

	deleteExercise(name:String){
		this.exercises = this.exercises.filter(exercise => exercise.name !== name);
		this.exercisesChanged.next(true);
	}

	createBlankExercise():ExerciseVO{
		var exercise = new ExerciseVO();
		exercise.name = "Exercise-" + this.exercises.length;
		this.exercises.push(exercise);
		return exercise;
	}

	updateExercise(name:String, updated:ExerciseVO){
		for (var index in this.exercises){
			if (this.exercises[index].name === name){
				this.exercises[index] = updated;
				return;
			}
		}
		this.exercisesChanged.next(true);
	}
}