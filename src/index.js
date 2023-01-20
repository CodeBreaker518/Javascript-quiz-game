import { getData } from "./util/fetchData.js"
import { categories } from "./util/fetchData.js"


const button = document.querySelector('#btn-start')
const firstSection = document.querySelector('#firstSec')
const secondSection = document.querySelector('#secondSec')
const category = document.querySelector('#category')
const question = document.querySelector('#question')
const btnAnswer = document.querySelector('#btn-container')

let keysCategory = Object.keys(categories)
let viewOption = `<option selected disabled>Choose your category</option>`
keysCategory.forEach(value => {
  viewOption += `<option value='${categories[value]}'>${value}</option>`
})
category.innerHTML = viewOption


const viewAnswers = () => {
  const answersIDs = ["a1", "a2", "a3", "a4"];
  const shuffledArray = answersIDs.sort((a, b) => 0.5 - Math.random());
  console.log(shuffledArray)
  let viewAnswer = `<button type="button" class="btn btn-dark" id="${shuffledArray[3]}"></button>`
  console.log(viewAnswer)
  for (let i = 0; i < 3; i++) {
    viewAnswer +=`<button type="button" class="btn btn-dark" id="${shuffledArray[i]}"></button>`
    btnAnswer.innerHTML = viewAnswer
  }
}
viewAnswers()

let answer1 = document.querySelector('#a1')
let answer2 = document.querySelector('#a2')
let answer3 = document.querySelector('#a3')
let answer4 = document.querySelector('#a4')


button.addEventListener('click', () => {
  
  firstSection.style.display='none'
  secondSection.style.display='none'
  const limit = document.querySelector('#limit').value
  const difficulty = document.querySelector('#difficulty').value
  const category = document.querySelector('#category').value
  
  let data = {
      "limit": limit,
      "difficulty": difficulty,
      "category": category
  }
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
          console.log(i)
          return
        }
        question.innerHTML = result[i].question
        answer1.innerHTML = result[i].incorrectAnswers[0]
        answer2.innerHTML = result[i].incorrectAnswers[1]
        answer3.innerHTML = result[i].incorrectAnswers[2]
        answer4.innerHTML = result[i].correctAnswer
        console.log(result[i].correctAnswer)
        i++

      }, 3000);
    }
    showQuestions()
  })
})




