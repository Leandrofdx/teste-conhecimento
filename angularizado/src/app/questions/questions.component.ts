import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from './service/questions.service'
import {ActivatedRoute} from '@angular/router'
import 'rxjs/add/operator/do'
import {Router} from '@angular/router'
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms'


@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	animations: [
	trigger('row', [
	  state('ready', style({opacity: 1})),
	  transition('void => ready', animate('300ms 0s ease-in', keyframes([
		style({opacity:0, transform: 'translateX(-30px)', offset:0}),
		style({opacity:0.8, transform: 'translateX(10px)', offset:0.8}),
		style({opacity:1, transform: 'translateX(0px)', offset:1})
	  ]))),
	  transition('ready => void', animate('300ms 0s ease-out', keyframes([
		style({opacity:1, transform: 'translateY(0px)', offset:0}),
		style({opacity:0.8, transform: 'translateY(-10px)', offset:0.2}),
		style({opacity:0, transform: 'translateY(30px)', offset:1})
	  ])))
	])
  ]
})

export class QuestionsComponent implements OnInit {	

	ready = 'ready'

	public questions
	public objeto = []
	public options = []
	public play = false
	public visible = false
	public status = false
	public end = false
	public myOptions
	public cont:number = 1
	public optionsForm: FormGroup
	public respostaCorreta

	public errou = []
	public acertou = []

	constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private formBuilder: FormBuilder,  private router: Router) {}

	ngOnInit() { this.questionsService.questionById(this.route.snapshot.params['id']).subscribe(question => this.questions = question, request => console.log('Deu erro'), () => this.start()) 

		this.optionsForm = this.formBuilder.group({
			options: this.formBuilder.array([], Validators.required)
		});
	}

	onChange(option:string, isChecked: boolean) {

		var myOptions = <FormArray>this.optionsForm.controls.options;
		this.myOptions = myOptions

		if(isChecked) {
			myOptions.push(new FormControl(option));
		} else {
			let index = myOptions.controls.findIndex(x => x.value == option)
			myOptions.removeAt(index);
		}
	}

	start() {
		if(this.end) {
			this.questionsService.resultado(this.acertou, this.errou)

			if(this.acertou.length >= 4 ) {
				this.router.navigate(['/win'])
			} else {
				this.router.navigate(['/lose'])
			}

		}

		const alternatives = this.questions.alternatives
		const options = []
		const nao = 'nao'
		const sim = 'sim'

		for (var i in alternatives) {

			if(alternatives[i].ativo === undefined && alternatives[i].ativo != nao)  {
				this.questions.alternatives.map(q => [q, q.ativo = nao, q.respondeu = nao ]);
				return false
			} 

			if(alternatives[i].ativo == nao && alternatives[i].respondeu == nao ) {
				this.objeto = []
				this.resetResponse()
				this.visible = false


				this.questions.alternatives[i].ativo = sim
				this.objeto.push(this.questions.alternatives[i])
				this.extract();
				return false
			}

			if(alternatives[i].ativo == sim && alternatives[i].respondeu == nao) {
				this.objeto = []
				this.questions.alternatives[i].ativo = nao
				this.questions.alternatives[i].respondeu = sim
				this.objeto.push(this.questions.alternatives[i])
				this.extract();
				this.result();
				return false
			}

		}
	}

	extract() {
		this.options = []
		for (let i in this.objeto) {
			for (let j in this.objeto[i].options) {
				for (let k in this.objeto[i].options[j]) {
					this.options.push(this.objeto[i].options[j][k])
				}
			}
		}
	}

	resetResponse () {
		if(this.myOptions != undefined) {
			for (var i in this.myOptions.value) {

				let index = this.myOptions.controls.findIndex(x => x.value == this.myOptions.value[i])
				this.myOptions.removeAt(index);
			}
		}
	}

	continuar() {
		this.play = true
		this.start()
	}

	result() {
		this.cont++
		const respostaCorreta = this.objeto[0].response
		this.respostaCorreta = this.objeto[0].response
		
		var resposta = this.myOptions.value[0]

		if(resposta === respostaCorreta && this.myOptions.value.length <= 1) {
			this.visible = true
			this.status = true
			this.acertou.push(resposta)
		} else {
			this.visible = true
			this.status = false
			this.errou.push(resposta)
		}

		if(this.end == false && this.cont > this.questions.alternatives.length) {
			this.end = true
		}
	}
}