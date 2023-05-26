import { WorkoutVO } from "../models/Workouts";

export class WorkoutStateStageInfo {
	time: number = 0;
	start: number = 0;
	end: number = 0;

	static from(s: any): WorkoutStateStageInfo {
		var o = new WorkoutStateStageInfo();
		for (let key in s) {
			Object(o)[key] = s[key];
		}

		return o;
	}
}

export class WorkoutState {
	public workout: WorkoutVO = new WorkoutVO;
	public stages: Array<WorkoutStateStageInfo> = [];

	static from(s: any): WorkoutState {
		var o = new WorkoutState();
		for (let key in s) {
			Object(o)[key] = s[key];
		}

		if (s.workout)
			o.workout = WorkoutVO.from(s.workout);
			
		if (s.stages)
			o.stages = s.stages.map((stage: any) => WorkoutStateStageInfo.from(stage));

		return o;
	}
}