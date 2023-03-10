import { getData } from "./util/fetchData.js"
import { categories } from "./util/fetchData.js"


const button = document.querySelector('#btn-start')
const firstSection = document.querySelector('#firstSec')
const secondSection = document.querySelector('#secondSec')
const category = document.querySelector('#category')
const question = document.querySelector('#question')
const btnAnswer = document.querySelector('#btn-container')
const gameSection = document.querySelector('#gameSection')
const mainView = document.querySelector('.main-view')
const questionView = document.querySelector('.question-view')

if (window.matchMedia("(max-width: 600px)").matches) {
    mainView.classList.remove('col-6')
    mainView.classList.add('col-12')
    questionView.classList.remove('col-6')
    questionView.classList.add('col-12')
} else {
    mainView.classList.remove('col-12')
    mainView.classList.add('col-6')
    questionView.classList.remove('col-12')
    questionView.classList.add('col-6')
}

// show options on category selection
let keysCategory = Object.keys(categories)
let viewOption = `<option selected disabled>Choose your category</option>`
keysCategory.forEach(value => {
  viewOption += `<option value='${categories[value]}'>${value}</option>`
})
category.innerHTML = viewOption

// creating buttons for answers
const viewAnswers = () => {
  const answersIDs = ["a1", "a2", "a3", "a4"];
  const shuffledArray = answersIDs.sort((a, b) => 0.5 - Math.random());
  let viewAnswer = `<button type="button" class="btn btn-secondary m-4" id="${shuffledArray[3]}"></button>`
  for (let i = 0; i < 3; i++) {
    viewAnswer +=`<button type="button" class="btn btn-secondary m-4" id="${shuffledArray[i]}"></button>`
    btnAnswer.innerHTML = viewAnswer
  }
}
//deploying buttons with random ids from a1 to a4
viewAnswers()

// select answers buttons
let answer1 = document.querySelector('#a1')
let answer2 = document.querySelector('#a2')
let answer3 = document.querySelector('#a3')
let answer4 = document.querySelector('#a4')

// timer for each question
let timeInterval = 10000

const disableButtons = () => {
  answer1.setAttribute('disabled','')
  answer2.setAttribute('disabled','')
  answer3.setAttribute('disabled','')
  answer4.setAttribute('disabled','')
}
//capture answers & count of answers
let userAnswer = ''
let numCorrect = 0
answer4.addEventListener( 'click', () => {
  console.log("Correct Answer")
  numCorrect = numCorrect + 1
  console.log(numCorrect)
  answer4.classList.remove('btn-secondary')
  answer4.classList.add('btn-success')
  disableButtons()
})
answer3.addEventListener('click', () => {
  console.log("incorrect Answer")
  answer3.classList.remove('btn-secondary')
  answer3.classList.add('btn-danger')
  disableButtons()

})
answer2.addEventListener('click', () => {
  console.log("incorrect Answer")
  answer2.classList.remove('btn-secondary')
  answer2.classList.add('btn-danger')
  disableButtons()

})
answer1.addEventListener('click', () => {
  console.log("incorrect Answer")
  answer1.classList.remove('btn-secondary')
  answer1.classList.add('btn-danger')
  disableButtons()
})

// start game
button.addEventListener('click', () => {
  gameSection.classList.remove('inactive')
  gameSection.classList.add('d-flex')
  firstSection.style.display='none'
  secondSection.style.display='none'
  
  // get values from settings game
  const limit = document.querySelector('#limit').value
  const difficulty = document.querySelector('#difficulty').value
  const category = document.querySelector('#category').value
  
  // map info
  let data = {
      "limit": limit,
      "difficulty": difficulty,
      "category": category
  }
  // get questions
  let questions = getData(data)

  questions.then(function(result){
    console.log(result)
    console.log(result.length)

    answer1.innerHTML = result[0].incorrectAnswers[0]
    answer2.innerHTML = result[0].incorrectAnswers[1]
    answer3.innerHTML = result[0].incorrectAnswers[2]
    answer4.innerHTML = result[0].correctAnswer
    question.innerHTML = result[0].question
    console.log(result[0].correctAnswer)

    let i = 1
    const showQuestions = () => {
      const intervalID = setInterval(() => {
        if (i === result.length){
          clearInterval(intervalID)
          return
        }
        viewAnswers()
        answer1 = document.querySelector('#a1')
        answer2 = document.querySelector('#a2')
        answer3 = document.querySelector('#a3')
        answer4 = document.querySelector('#a4')

        question.innerHTML = result[i].question
        answer1.innerHTML = result[i].incorrectAnswers[0]
        answer2.innerHTML = result[i].incorrectAnswers[1]
        answer3.innerHTML = result[i].incorrectAnswers[2]
        answer4.innerHTML = result[i].correctAnswer
        console.log(result[i].correctAnswer)
        i++

        const disableButtons = () => {
        answer1.setAttribute('disabled','')
        answer2.setAttribute('disabled','')
        answer3.setAttribute('disabled','')
        answer4.setAttribute('disabled','')
        }
        //capture answers & count of answers
        answer4.addEventListener( 'click', () => {
          console.log("Correct Answer")
          userAnswer = answer4.value
          console.log(userAnswer)
          numCorrect = numCorrect + 1
          console.log(numCorrect)
          answer4.classList.remove('btn-secondary')
          answer4.classList.add('btn-success')
          disableButtons()
        })
        answer3.addEventListener('click', () => {
          console.log("incorrect Answer")
          answer3.classList.remove('btn-secondary')
          answer3.classList.add('btn-danger')
          disableButtons()

        })
        answer2.addEventListener('click', () => {
          console.log("incorrect Answer")
          answer2.classList.remove('btn-secondary')
          answer2.classList.add('btn-danger')
          disableButtons()

        })
        answer1.addEventListener('click', () => {
          console.log("incorrect Answer")
          answer1.classList.remove('btn-secondary')
          answer1.classList.add('btn-danger')
          disableButtons()
        })
      }, timeInterval);
    }
    showQuestions()
  })
})




