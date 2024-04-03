import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkoutVO } from '../models/Workouts';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, Inject, OnInit } from '@angular/core';
import { EquipmentModel, EquipmentVO } from '../models/Equipment';

@Component({
	selector: 'equipment',
	templateUrl: './equipment.component.html',
	styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

	constructor(
		private model: EquipmentModel,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
	) {

	}

	editMode: boolean = false;
	equipment:EquipmentVO[] = this.model.getEquipment();

	ngOnDestroy() {
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			console.log(params['state']);
			//handle state
		});

		
		this.model.equipmentChanged.subscribe(() => {
			this.equipment = this.model.getEquipment();
		});
	}

	edit(){
		this.editMode = !this.editMode;
	}


	new(){
		this.router.navigate(['/editEquipment', {name: this.model.createBlankEquipment().name}]);
	  }

	back() {
		this.location.back();
	}

	cancel() {
		this.router.navigate(['/menu']);
	}

}
