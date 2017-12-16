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
	play = false

	constructor(private questionsService: QuestionsService, private route: ActivatedRoute) {}

	ngOnInit() { this.questionsService.questionById(this.route.snapshot.params['id']).subscribe(question => this.questions = question, request => console.log('Deu erro'), () => this.start()) }

	start() {

		var alternatives = this.questions.alternatives
		var options = []


		for (var i in alternatives) {

			if(alternatives[i].ativo === undefined && alternatives[i].ativo != 'nao')  {
				this.questions.alternatives.map(q => [q, q.ativo = "nao", q.respondeu = "nao" ]);
				return false
			} 

			if(alternatives[i].ativo == 'nao' && alternatives[i].respondeu == 'nao' ) {
				this.update()
				this.questions.alternatives[i].ativo = 'sim'
				this.objeto.push(this.questions.alternatives[i])
				this.extract();
				return false
			}


			if(alternatives[i].ativo == 'sim' && alternatives[i].respondeu == 'nao') {
				this.update()
				this.questions.alternatives[i].ativo = 'nao'
				this.questions.alternatives[i].respondeu = 'sim'
				this.objeto.push(this.questions.alternatives[i])
				this.extract();
				return false
			}

		}
	}


	extract() {
		this.options = []
		for (var i in this.objeto) {
			console.log('mirra' + this.questions.name)
			for (var j in this.objeto[i].options) {

				console.log(this.objeto[i].options[j].optionA)
				console.log(this.objeto[i].options[j].optionB)
				console.log(this.objeto[i].options[j].optionC)
				console.log(this.objeto[i].options[j].optionC)

				for (var k in this.objeto[i].options[j]) {
					this.options.push(this.objeto[i].options[j][k])
				}

			}
		}
	}


	update(){
		this.objeto = []
	}


	continuar(){
		this.play = true
		this.start()
	}







// var myObj, i, j, x = "";
// myObj = {
//     "name":"John",
//     "age":30,
//     "cars": [
//         { "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
//         { "name":"BMW", "models":[ "320", "X3", "X5" ] },
//         { "name":"Fiat", "models":[ "500", "Panda" ] }
//     ]
// }

// for (i in myObj.cars) {
//     x += "<h2>" + myObj.cars[i].name + "</h2>";
//     for (j in myObj.cars[i].models) {
//         x += myObj.cars[i].models[j] + "<br>";
//     }
// }





























}