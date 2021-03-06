import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from "../components/QuestionCard";

describe("Question Card test", () => {

    it('should render 4', () => {
        const mockFn = jest.fn()
        render(<QuestionCard
            question='sampleQuestion'
            answers={['a','b','c','d']}
            callback={mockFn}
            userAnswer={{
                question:'q1',
                answer:'1',
                correct: true,
                correctAnswer: '1'
            }}
            questionNo={1}
            totalQuestions={10} />)
        
        const comp = screen.getAllByRole('button')
        expect(comp.length).toBe(4)
    })
        
    it('should disable button onclick', async () => {
        const onClick = jest.fn()
        const { getByText } = render(<QuestionCard
            question='sampleQuestion'
            answers={['a','b','c','d']}
            callback={onClick}
            userAnswer={{
                question:'q1',
                answer:'1',
                correct: true,
                correctAnswer: '1'
            }}
            questionNo={1}
            totalQuestions={10} />
        )
        
        // const comp = screen.getAllByRole('button')
        const comp = getByText('a')
        fireEvent.click(comp)
        const comp1 = getByText('b')
        expect(comp1).toHaveAttribute("disabled")
    })

    it('should render 1/10, sampleQuestion', async () => {
        const onClick = jest.fn()
        const { getByText } = render(<QuestionCard
            question='sampleQuestion'
            answers={['a','b','c','d']}
            callback={onClick}
            userAnswer={{
                question:'q1',
                answer:'1',
                correct: true,
                correctAnswer: '1'
            }}
            questionNo={1}
            totalQuestions={10} />
        )
        
        // const comp = screen.getAllByRole('button')
        const text1 = getByText('Question: 1 / 10')
        const text2 = getByText('sampleQuestion')
        expect(text1).toBeInTheDocument()
        expect(text2).toBeInTheDocument()
        
    })

})