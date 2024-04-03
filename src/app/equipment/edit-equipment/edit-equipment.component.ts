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

	public name:string = "";
	public equipment: EquipmentVO = new EquipmentVO();
	public plates:string = "";

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			let name = params['name'];
			this.name = name;
			console.log(name)
			this.equipment = this.model.getEquipmentByName(String(name));
			this.plates = this.numberArrayToString(this.equipment.unitValues);
		});
	}


	delete(){
		this.model.deleteEquipment(this.name);
		this.back();
	}

	save(){
		this.equipment.unitValues = this.stringToNumberArray(this.plates);
		this.model.updateEquipment(this.name, this.equipment);
	}

	back(){
		this.location.back();
	}


	changeDefaultWeight(num: number){
		this.equipment.defaultWeight += num;
	}

	 stringToNumberArray(inputString: string) {
		const numericString = inputString.replace(/[^0-9,\.]/g, '');
		const numberArray = numericString.split(',').map(Number);
		return numberArray;
	}
	
	 numberArrayToString(numberArray: number[]) {
		const filteredArray = numberArray.filter(num => !isNaN(num));
		const resultString = filteredArray.join(',');
		return resultString;
	}


	changeCalculationMethod(event:MatTabChangeEvent){
		this.equipment.calculationMethod = event.index === 0 ? CalculationMethod.Barbell : CalculationMethod.Kettlebell;
	}

}
