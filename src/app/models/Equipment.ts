import { Subject } from "rxjs";
import { makeid } from "./randomid";
import { Injectable } from '@angular/core';

export class EquipmentVO {
	id: string = "";
	name: string = "";
	unit: string = ""; // Default unit (e.g., "kg")
	unitValues: number[] = []; // List of available units (e.g., ["2kg", "5kg", "10kg"])
	defaultWeight: number = 45; // Default weight of the equipment (e.g., "2kg" for the bar)
	calculationMethod: CalculationMethod; // How the final weight is calculated
  
	constructor() {
	  this.id = makeid(20);
	  this.calculationMethod = CalculationMethod.Barbell; // Default calculation method
	}
  
	static from(o: any): EquipmentVO {
	  let s = new EquipmentVO();
  
	  for (const key in o) {
		if (o.hasOwnProperty(key) && typeof o[key] !== 'undefined') {
		  Object(s)[key] = o[key];
		}
	  }
  
	  return s;
	}
  
	clone(): EquipmentVO {
	  const clonedEquipment = new EquipmentVO();
	  clonedEquipment.id = this.id;
	  clonedEquipment.name = this.name;
	  clonedEquipment.unit = this.unit;
	  clonedEquipment.unitValues = [...this.unitValues];
	  clonedEquipment.defaultWeight = this.defaultWeight;
	  clonedEquipment.calculationMethod = this.calculationMethod;
  
	  return clonedEquipment;
	}

	private generateCombinations(weights: number[], target: number, partial: number[] = []): number[][] {
		let s = partial.reduce((a, b) => a + b, 0);
		if (s === target) return [partial];
		if (s >= target) return [];
		let list = [];
		for (let i = 0; i < weights.length; i++) {
		  let n = weights[i];
		  let remaining = weights.slice(i + 1);
		  let results = this.generateCombinations(remaining, target, partial.concat([n]));
		  list.push(...results);
		}
		return list;
	  }
	
	  findPlatesForWeight(targetWeight: number): number[] | null {
		let sideTarget = (targetWeight - this.defaultWeight) / 2; // Calculate per side target
		let combinations = this.generateCombinations(this.unitValues, sideTarget);
		if (combinations.length > 0) {
		  // Assuming you want the combination with the least plates
		  combinations.sort((a, b) => a.length - b.length);
		  return combinations[0]; // Return the first combination (or another logic)
		}
		return null; // Return null or an appropriate value if no combination is found
	  }
	  
  }
  
  export enum CalculationMethod {
	Barbell = "Barbell", // Indicates 2x plates + default weight
	Kettlebell = "Kettlebell" // Indicates no default weight, unit is all you can pick.
	// Other calculation methods can be added here as needed
  }
  
  

@Injectable({
  providedIn: 'root'
})
export class EquipmentModel {

  constructor() {
    var equipment = window.localStorage.getItem("equipment");
    if (equipment && JSON.parse(equipment).length > 0) {
      this.equipmentList = [];
      JSON.parse(equipment).forEach((e: any) => {
        this.equipmentList.push(EquipmentVO.from(e));
      });
    }
  }

  public equipmentChanged: Subject<boolean> = new Subject<boolean>();
  private equipmentList: Array<EquipmentVO> = [];

  getEquipmentByName(name: String): EquipmentVO {
    var list = this.equipmentList.filter(equipment => equipment.name === name);
    if (list.length > 0)
      return list[0];
    return this.createBlankEquipment();
  }

  getEquipment(): Array<EquipmentVO> {
    return JSON.parse(JSON.stringify(this.equipmentList));
  }

  deleteEquipment(name: String) {
    this.equipmentList = this.equipmentList.filter(equipment => equipment.name !== name);
    this.equipmentChanged.next(true);
    this.save();
  }

  createBlankEquipment(): EquipmentVO {
    var equipment = new EquipmentVO();
    equipment.name = "Equipment-" + this.equipmentList.length;
    this.equipmentList.push(equipment);
    this.save();
    return equipment;
  }

  updateEquipment(name: String, updated: EquipmentVO) {
    for (var index in this.equipmentList) {
      if (this.equipmentList[index].name === name) {
        this.equipmentList[index] = updated;
      }
    }
    this.equipmentChanged.next(true);
    this.save();
  }

  save() {
    window.localStorage.setItem("equipment", JSON.stringify(this.equipmentList));
  }
}
