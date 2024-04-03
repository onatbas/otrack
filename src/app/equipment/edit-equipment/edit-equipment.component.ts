import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculationMethod, EquipmentModel, EquipmentVO } from 'src/app/models/Equipment';
import { Location } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
	selector: 'app-edit-equipment',
	templateUrl: './edit-equipment.component.html',
	styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private model: EquipmentModel,
		private location: Location
	) { }

	public oldName:string = "";
	public equipment: EquipmentVO = new EquipmentVO();
	public plates:string = "";

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			let name = params['name'];
			this.oldName = name;
			console.log(name)
			this.equipment = this.model.getEquipmentByName(String(name));
			this.plates = this.equipment.numberArrayToString(this.equipment.unitValues);
		});
	}


	delete(){
		this.model.deleteEquipment(this.oldName);
		this.back();
	}

	save(){
		this.equipment.unitValues = this.equipment.stringToNumberArray(this.plates);
		this.model.updateEquipment(this.oldName, this.equipment);
	}

	back(){
		this.location.back();
	}


	changeDefaultWeight(num: number){
		this.equipment.defaultWeight += num;
	}


	changeCalculationMethod(event:MatTabChangeEvent){
		this.equipment.calculationMethod = event.index === 0 ? CalculationMethod.Barbell : CalculationMethod.Kettlebell;
	}

}
