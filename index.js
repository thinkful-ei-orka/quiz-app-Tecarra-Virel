function startQuiz() {
    STORE.questionIndex = 0;
    STORE.score = 0;
    $('#begin-quiz button').click(function() {
        const parentID = $(this).closest('section').attr('id');
        console.log(parentID);
        renderQuestions(parentID);
    });
}

function evalQuestion() {
    $('body').on("click", 'form #js-submit-button', function(event) {
            event.preventDefault();

            const parentID = $(this).closest('section').attr('id');
            const selAnswer = $(this).closest('section').find('.checked').attr('value');

            if (!selAnswer) {
                return promptSelection('No selection!', style.noAnswer);
            } else if(checkAnswer(selAnswer) == 'correct') {
                // Give user feedback
                STORE.questionIndex += 1;
                STORE.score += 1;
                promptSelection('Correct!', style.correct);
                nextButton();
            } else if(checkAnswer(selAnswer) == 'inCorrect') {
                // Give user feedback
                const feedback = 'incorrect! correct answer is ' +  STORE.questions[STORE.questionIndex].correctAnswer;
                STORE.questionIndex += 1;
                promptSelection(feedback, style.incorrect);
                nextButton();
            }
    })
}

function selectedOption() {
    $('body').on('click','.js-form-option', event => {
        console.log('Hi');
        const targetAnswer = $(event.currentTarget);

        const otherAnswers = $('.js-form-option').not(targetAnswer);

        const pressedBool = $(targetAnswer).attr('aria-pressed') === 'true';

        otherAnswers.removeClass('checked').attr('aria-pressed', false);

        targetAnswer.addClass('checked').attr('aria-pressed', !pressedBool);
    })
}

function whenNextButtonClicked() {
    $('body').on("click",'form #js-next-button', function(event) {
        event.preventDefault();
        const parentID = $(this).closest('section').attr('id');
        console.log(parentID);
        renderQuestions(parentID);
    })
}

function tryAgain() {
    $('body').on("click", '#results-quiz button', function(event) {
        const parentID = $(this).closest('section').attr('id');
        STORE.questionIndex = 0;
        STORE.score = 0;
        renderQuestions(parentID);
    });
}

function promptSelection(displayText, cl) {
    console.log(cl);
    const feedback = $('form').closest('form').find('#feedback');
    console.log(feedback);
    if(!feedback) {
        $('form').after('<p id="feedback" class="'+ cl +'">' + displayText + '</p>');
    } else {
        $('form').find('#feedback').replaceWith('<p id="feedback" class="'+ cl +'">' + displayText + '</p>');
    }
}

function checkAnswer(answer) {
    if(answer == STORE.questions[STORE.questionIndex].correctAnswer) {
        return 'correct';
    } else if(answer != STORE.questions[STORE.questionIndex].correctAnswer) {
        return 'inCorrect';
    } else {
        return 'noAnswer'
    }
}

function nextButton() {
    $('form #js-submit-button').replaceWith("<input type='submit' id='js-next-button' class='main-button' value='Next'></input>");
}

function renderQuestion(index, parentId) {
    const questionIndex = STORE.questionIndex + 1;
    $('#' + parentId).replaceWith(
        "<section id='question-quiz'>" +
            "<p id='score'>"+ "SCORE:" + STORE.score + "</p>" +
            "<p id='question-num'>" + "QUESTION:" + (questionIndex) +"</p>" +
            "<h2>" + STORE.questions[index].question + "</h2>" +
            "<form onsubmit='return false;' class='js-quiz-form'>" +
                generateQuizOptionsString(index) +
                "<input type='submit' id='js-submit-button' class='main-button' value='Submit'>" +
                "<p id='feedback'></p>" +
            "</form>" +
        "</section>"
    );
}

function generateQuizOptionsString(index) {
    const items = STORE.questions[index].choices.map((choice, idx) => "<input type='button' aria-pressed='false' class='form-option js-form-option' name='answer' value='" + STORE.questions[index].choices[idx] + "'>");
    return items.join("");
}

function renderResults(parentID) {
    $('#' + parentID).replaceWith(
        '<section id="results-quiz">' +
            '<h2>Quiz Results</h2>' +
            '<p id="results">Results:'+ STORE.score + '/' + STORE.questions.length + '</p>' +
            '<button class="main-button" type="button">Try Again</button>' +
        '</section>'
    )
}

function renderQuestions(parentID) {
    const index = STORE.questionIndex;
    if(STORE.questionIndex == STORE.questions.length) {
        renderResults(parentID);
    } else {
        renderQuestion(index, parentID);
    }
}


function handleQuizApp() {
    startQuiz();
    selectedOption();
    evalQuestion();
    tryAgain();
    whenNextButtonClicked();
}

$(handleQuizApp)