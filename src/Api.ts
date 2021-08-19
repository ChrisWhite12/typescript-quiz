import axios from "axios"
import { shuffleArr } from "./utils"

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

export type QuestionState = Question & { answers: string[] }

export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {
    // const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    // const data = await (await fetch(endpoint)).json()

    const {data} = await axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`)
    // console.log('data',data)
    return data.results.map((question: Question) => {
        // console.log(question.question)
        const replacedWord = question.question.replace(/&quot;/g,'"').replace(/&#039;/g,'`')

        // console.log(replacedWord)
        return (
            {
                ...question,
                question: replacedWord,
                answers: shuffleArr([...question.incorrect_answers, question.correct_answer])
            }
        )
    }

    )
    // return data
}