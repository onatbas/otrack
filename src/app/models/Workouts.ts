import { Subject } from "rxjs";

export class WorkoutVO {
	name:String = "";
}

export class WorkoutModel {
	updateWorkout(workoutName: String, workout: WorkoutVO) {
		for (var index in this.workouts){
			if (this.workouts[index].name === workoutName){
				this.workouts[index] = workout;
				return;
			}
		}
		this.workoutsChanged.next(true);
	}
	
	getWorkoutByName(name:String): WorkoutVO {
		var list = this.workouts.filter(workout => workout.name === name);
		if (list.length > 0)
			return list[0];
		return this.createBlankWorkout();
	}

	createBlankWorkout() {
		var workout = new WorkoutVO();
		workout.name = "Workout-" + this.workouts.length;
		this.workouts.push(workout);
		return workout;
	}

	public workoutsChanged:Subject<boolean> = new Subject<boolean>();
	private workouts:Array<WorkoutVO> = [
		{name: "Kettlebell HIIT"}
	];

	getWorkouts():Array<WorkoutVO>{
		return JSON.parse(JSON.stringify(this.workouts));
	}

	deleteWorkout(name: any) {
		this.workouts = this.workouts.filter(workout => workout.name !== name);
		this.workoutsChanged.next(true);
	}
}