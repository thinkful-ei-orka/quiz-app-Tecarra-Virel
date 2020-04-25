const STORE = {
  questions: [
    {
      question: 'What war did Captain America fight in?',
      choices: [
        'World War 1',
        'World War 2',
        'The Vietnam War',
        'The Korean War',
      ],
      correctAnswer: 'World War 2'
    },
    {
      question: 'What was Iron Man’s Nickname for Thor?',
      choices: [
        'Ice Man',
        'Point Break',
        'Popsicle',
        'Legolas',
      ],
      correctAnswer: 'Point Break'
    },
    {
      question: 'Where is Avengers Tower Located?',
      choices: [
        'Chicagp',
        'Cleveland',
        'New York',
        'Texas',
      ],
      correctAnswer: 'New York'
    },
    {
      question: 'What is Captain Americas shield made of?',
      choices: [
        'Mithral',
        'Adamacium',
        'Titanium',
        'Vibranium',
      ],
      correctAnswer: 'Vibranium'
    }, 
    {
      question: "What is Thor's new hammer called",
      choices: [
        'Stormbreaker',
        'Mjolnir',
        'Stormbringer',
        'Doomhammer',
      ],
      correctAnswer: 'Stormbreaker'
    }, 
  ],
  score: 0,
  questionIndex: 0,
}

const style = {
  'correct': 'feedback-correct',
  'incorrect': 'feedback-incorrect',
  'noAnswer': 'feedback-noAnswer',
}
