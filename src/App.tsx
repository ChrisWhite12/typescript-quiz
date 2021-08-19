import React from "react";
import { useState } from "react";
import { fetchQuiz } from "./Api";
import "./App.css";

import QuestionCard from "./components/QuestionCard";

import { QuestionState, Difficulty } from "./Api";
import AnswerIndicator from "./components/AnswerIndicator";

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [renderIndicator, setRenderIndicator] = useState(false)
    const [correct, setCorrect] = useState(false)

    const startTrivia = async () => {
        setIsLoading(true);
        setGameOver(false);
        const newQ = await fetchQuiz(TOTAL_QUESTIONS, Difficulty.EASY);

        // console.log('newQ', newQ)
        setQuestions(newQ);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setIsLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver){
        const answer = e.currentTarget.value 
        const isCorrect = questions[number].correct_answer === answer
        if (isCorrect){
          setScore(prev => prev + 1)
          setCorrect(true)
        }
        
        setRenderIndicator(true)
        const answerObj = {
          question: questions[number].question,
          answer,
          correct: isCorrect,
          correctAnswer: questions[number].correct_answer
        }

        setUserAnswers(prev => [...prev, answerObj])
      }
    };

    const nextQuestion = () => {
      setRenderIndicator(false)
      setCorrect(false)
      const nextQ = number + 1
      if (nextQ === TOTAL_QUESTIONS){
        setGameOver(true)
      }
      else{
        setNumber(nextQ)
      }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Typescript Quiz</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="start" onClick={startTrivia}>
                        Start
                    </button>
                ) : null}
                {!gameOver ? <p className="score">Score: {score}</p> : null}

                {isLoading ? <p>Loading...</p> : <></>}

                {!isLoading && !gameOver ? (
                    <QuestionCard
                        questionNo={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={
                            userAnswers ? userAnswers[number] : undefined
                        }
                        callback={checkAnswer}
                    />
                ) : null}

                {renderIndicator ? <AnswerIndicator correct={correct} /> : null}
                {(!gameOver &&
                    !isLoading &&
                    (userAnswers.length === number + 1) &&
                    number !== TOTAL_QUESTIONS + 1) ? 

                    <button className="nextQuestion" onClick={nextQuestion}>
                        Next Question
                    </button>
                    : null
                  }
            </header>
        </div>
    );
}

export default App;
