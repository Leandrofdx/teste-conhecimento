import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from './questions.service'
import {ActivatedRoute} from '@angular/router'
import { Questions } from './questions.model';
import 'rxjs/add/operator/do'


@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html'
})

export class QuestionsComponent implements OnInit {
 
	public questions
	public objeto = []
	public options = []
	play: boolean = true

	constructor(private questionsService: QuestionsService, private route: ActivatedRoute) {}

	ngOnInit() { this.questionsService.questionById(this.route.snapshot.params['id']).subscribe(question => this.questions = question, request => console.log('Deu erro'), () => console.log('tudo ok')) }

	start() {

		this.play  = true
		var alternatives = this.questions.alternatives
		var questions = []

		var actives = []

		for (var i in alternatives) {

			if(alternatives[i].ativo === undefined && alternatives[i].ativo != 'nao')  {
				console.log('entrou para não')
				this.questions.alternatives.map(q => [q, q.ativo = "nao", q.respondeu = "nao" ]);
				return false

			} 

			if(alternatives[i].ativo == 'nao' && alternatives[i].respondeu == 'nao' ) {
				this.questions.alternatives[i].ativo = 'sim'
				console.log('entrou para sim')
				console.log(this.questions.alternatives[i])
				return false
			}

	
			if(alternatives[i].ativo == 'sim' && alternatives[i].respondeu == 'nao') {
				this.questions.alternatives[i].ativo = 'nao'
				this.questions.alternatives[i].respondeu = 'sim'
				console.log('respondeu')
				console.log(this.questions.alternatives[i])
				return false
			}

		}
	}




















}