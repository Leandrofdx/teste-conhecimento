export class Questions {
  id: string
  name: string
  x: [{
    id: number 
    question: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    response : string
  }]
}

export interface Ask {
  	id: number 
    question: string
    optionA: string
    optionB: string
    optionC: string
    optionD: string
    response : string
}
