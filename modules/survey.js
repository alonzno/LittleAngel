class InitialSurvey{

	constructor(questionarray){
		this.questionarray = questionarray;
	}

	/*takes file and parses it into questions*/
	parse_questions(){

		var questions = '{"question: what is your name" ,"question: what is your name" }'

		var parsedjson = JSON.parse(questions);
		console.log(parsedjson.question);
	}	
}