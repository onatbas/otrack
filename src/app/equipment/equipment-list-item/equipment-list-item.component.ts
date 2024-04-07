import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentModel, EquipmentVO } from 'src/app/models/Equipment';

@Component({
	selector: 'app-equipment-list-item',
	templateUrl: './equipment-list-item.component.html',
	styleUrls: ['./equipment-list-item.component.css']
})
export class EquipmentListItemComponent implements OnInit {

	constructor(
		private model: EquipmentModel,
		private router: Router
	) { }


	@Input() edit: boolean = false;

	@Input() equipment: EquipmentVO = new EquipmentVO();

	ngOnInit(): void {
	}

	info() {
	}

	editItem() {
		this.router.navigate(['/editEquipment', { name: this.equipment.name }]);
	}

	delete() {
		this.model.deleteEquipment(this.equipment.name);
	}

}
