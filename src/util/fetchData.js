// https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=5&difficulty=medium

const API = `https://the-trivia-api.com/api/`

const fetchData = async (urlApi) => {
    const data = await fetch(urlApi)
    const dataJson = await data.json()
    return dataJson
  }
const categories = await fetchData(`${API}categories`)
const metadata = await fetchData(`${API}metadata`)

const getData = async (data) => {
  let questionLimit = data["limit"]
  let difficulty =  data["difficulty"]
  let category = data["category"]
  const questions = await fetchData(`${API}questions?categories=${category}&limit=${questionLimit}&difficulty=${difficulty}`)
  return questions
}
export {categories, metadata, getData}
