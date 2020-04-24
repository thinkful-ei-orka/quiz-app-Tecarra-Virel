var myQuestions = [
	{
		question: "What war did Captain America fight in?",
		answers: {
			a: 'World War 1',
			b: 'World War 2',
            c: 'The Korean War',
            d: 'The Vietnam War'
		},
		correctAnswer: 'b'
	},
	{
		question: "What was Iron Man’s Nickname for Thor?",
		answers: {
			a: 'Ice Man',
			b: 'Point Break',
            c: 'Popsicle',
            d: 'Strongest Avenger'
		},
		correctAnswer: 'd'
    }
    {
        question: "Where is the Avengers Tower Located?",
		answers: {
			a: 'Chicago',
			b: 'New York',
            c: 'California',
            d: 'Texas'
        },
        correctAnswer: 'b'
    }
    {
        question: "What is Captain Americas shield made of?",
		answers: {
			a: 'Mithral',
			b: 'Adamacium',
            c: 'Titanium',
            d: 'Vibranium'
        },
        correctAnswer: 'd'
    }
    {
        question: "What is Thor's hammer called??",
		answers: {
			a: 'Stormbreaker',
			b: 'Mjolnir',
            c: 'Stormbringer',
            d: 'Doomhammer'
        },
        correctAnswer: 'a'
    }
];
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}