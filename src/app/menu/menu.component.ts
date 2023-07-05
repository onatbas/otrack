import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(
	private route: ActivatedRoute,
	private router: Router
  ) {
  }

  public version:String = '';

  ngOnInit(): void {
	this.version = environment.version;
  }


  exercises():void{
	this.router.navigate(['/exercises']);

  }

  workouts():void{
	this.router.navigate(['/workouts']);
  }

  export():void{
	this.router.navigate(['/export']);
  }

  import():void{
	this.router.navigate(['/import']);
  }
}
