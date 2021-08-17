import React from "react";
import { AnswerObject } from "../App";


interface Props {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNo,
    totalQuestions,
}) => {
    return (<div>
        <p className='number'>
            Question: {questionNo} / {totalQuestions}
        </p>
        <p>{question}</p>
        <div>
            {answers.map((answer) => {
                return (
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            {/* <span dangerouslySetInnerHTML={{ __html: answer}} /> */}
                            {answer}
                        </button>
                    </div>
                )
            })}
        </div>

    </div>);
};

export default QuestionCard;
