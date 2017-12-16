import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Matters } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  matters: Matters[]

  constructor(private mattersService: HomeService) { }

  ngOnInit() {

  	this.mattersService.matters()
      .subscribe(matters => this.matters = matters)
	 }
}
