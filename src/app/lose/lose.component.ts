import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions/service/questions.service'
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'


@Component({
  selector: 'app-lose',
  templateUrl: './lose.component.html',
	animations: [
	trigger('row', [
	  state('ready', style({opacity: 1})),
	  transition('void => ready', animate('300ms 0s ease-in', keyframes([
		style({opacity:0, transform: 'translateY(-30px)', offset:0}),
		style({opacity:0.8, transform: 'translateY(10px)', offset:0.8}),
		style({opacity:1, transform: 'translateY(0px)', offset:1})
	  ]))),
	  transition('ready => void', animate('300ms 0s ease-out', keyframes([
		style({opacity:1, transform: 'translateY(0px)', offset:0}),
		style({opacity:0.8, transform: 'translateY(-10px)', offset:0.2}),
		style({opacity:0, transform: 'translateY(30px)', offset:1})
	  ])))
	])
  ]
})
export class LoseComponent implements OnInit {
  ready = 'ready'
  public qtdErros

  constructor(private questionsService: QuestionsService) { }

  ngOnInit() {
 		this.qtdErros =  this.questionsService.errou.length
  }





}
