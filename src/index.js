const quizContainer = document.getElementById('quiz')
const resultsContainer = document.getElementById('results')
const submitButton = document.getElementById('submit')
const questionContainer = document.getElementById('question')
function getQuestions() {
    fetch('https://opentdb.com/api.php?amount=10')
    .then((res) => res.json())
    .then((data) => {
         console.log(data)
        let trivia = data.results            //get data from results array json
        for (let i=0; i < trivia.length; i++) { // loop thru the array
          let question = trivia[i].question
            // console.log(question) // extract the question key from array
            let output = []
output.push(
    `<div class="question"> ${question} </div>`)
            console.log(output)
            questionContainer.innerHTML = output
        }
       
    })
    .catch((err) => console.log(err))
}
getQuestions()






// quiz questions array
let myQuestions = [
    {
        question: "first Question",
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3'
        },
        correct_answer: 'a'
    },
    {
        question: "second question",
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3'
        },
        correct_answer: 'b'
    },
    {
        question: "third question",
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3'
        },
        correct_answer: 'c'
    }

]
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton)


function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
   
   function showQuestions(questions, quizContainer){
     // store html output and answers
     var output = [];
     let answers;

     // loop through each question
     for(var i=0; i < questions.length; i++){
         // reset the list of answers
         answers = [];
         // for each available answer to this question...
         
for(var letter in questions[i].answers){

            // add an html radio button
            answers.push(
                '<label>'
						+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
						+ letter + ': '
						+ questions[i].answers[letter]
					+ '</label>'
                    );
         }
         output.push(
            `<div class="question"> ${questions[i].question} </div>
            <div class="answers"> ${answers.join('')} </div>`
            )
     }
    //combine our output list into one string of HTML an put it on the page

     quizContainer.innerHTML = output.join('')
   }
   
   

function showResults(questions, quizContainer, resultsContainer) {
    // gather answer conatainers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
     // keep track of user's answers
     let userAnswer = '';
     let numCorrect = 0;

     // for each question...
     for(var i=0; i<questions.length; i++){

        // find selected answer
       userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

        // if anwer is correct
        if (userAnswer === questions[i].correct_answer) {
            // add to number of correct answers
            numCorrect++;
             // color the answers green
             answerContainers[i].style.color = 'lightgreen'
        } else {
            answerContainers[i].style.color = 'red';
        }
     }
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
}
    
showQuestions(questions, quizContainer)
   


//on submit, show results
submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
    }
}