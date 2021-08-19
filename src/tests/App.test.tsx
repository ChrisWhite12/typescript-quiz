import '@testing-library/jest-dom'
import App from '../App'
import { fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'


jest.mock('axios')

const axiosRes = {
    data: {
        results: [
            {
                category: 'asdf',
                correct_answer: 'a',
                difficulty: 'easy',
                incorrect_answers: ['b', 'c', 'd'],
                question: 'what is a?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            },
            {
                category: 'asdf',
                correct_answer: 'b',
                difficulty: 'easy',
                incorrect_answers: ['a', 'c', 'd'],
                question: 'what is b?',
                type: 'multiple'
            }
        ]
    }
}

const mockAxios = axios as jest.Mocked<typeof axios>

describe('App tests', () => {

    //mock fetch
    it('should show the start page', () => {
        const { getByText } = render(<App />)

        const text1 = getByText('React Typescript Quiz')
        expect(text1).toBeInTheDocument()

        //render start button
        const btn1 = getByText('Start')
        // console.log('btn1',btn1);
        expect(btn1).toBeInTheDocument()
        expect(btn1.tagName).toBe('BUTTON')

    })

    it('should show the loading screen', async () => {
        mockAxios.get.mockResolvedValue(axiosRes)
        // { getByText, findByText, getByRole, findByTestId }
        const { getByText, findByText } = render(<App />)
        const btn1 = getByText('Start')
        
        expect(btn1).toBeInTheDocument()
        fireEvent.click(btn1)
        
        const text1 = getByText('Loading...')
        //loading text
        expect(text1).toBeInTheDocument()
        const text2 = await findByText('Question: 1 / 10')              //use to stop act warning
    })

    it('should render the question list, correct answer', async () => {
        mockAxios.get.mockResolvedValue(axiosRes)
        const { getByText, findByText, getByRole, findByTestId } = render(<App />)
        const btn1 = getByText('Start')
        fireEvent.click(btn1)

        const text2 = await findByText('Question: 1 / 10')
        expect(text2).toBeInTheDocument()

        const text3 = getByText('what is a?')
        expect(text3).toBeInTheDocument()

        const btnA = getByRole('button', {name: 'a'})
        fireEvent.click(btnA)

        const indic1 = await findByTestId('svg')
        expect(indic1.dataset.correct).toBe('true')
        
    })

    it('should render the question list, incorrect answer', async () => {
        mockAxios.get.mockResolvedValue(axiosRes)
        const { getByText, findByRole, findByTestId } = render(<App />)
        const btn1 = getByText('Start')
        fireEvent.click(btn1)

        const btnA = await findByRole('button', {name: 'b'})
        fireEvent.click(btnA)

        const indic1 = await findByTestId('svg')
        expect(indic1.dataset.correct).toBe('false')
        
    })

    it('should reach gameover', async () => {
        mockAxios.get.mockResolvedValue(axiosRes)
        const { getByText, findByRole, findByText } = render(<App />)
        const btn1 = getByText('Start')
        fireEvent.click(btn1)

        for (let ind = 1; ind < 10; ind++) {
            const btnA = await findByRole('button', {name: 'b'})
            fireEvent.click(btnA)
            const btnNext = await findByRole('button', {name: 'Next Question'})
            fireEvent.click(btnNext)
            const textQ = await findByText(`Question: ${ind + 1} / 10`)
            expect(textQ).toBeInTheDocument()
        }

        const btnA2 = await findByRole('button', {name: 'b'})
        fireEvent.click(btnA2)
        const btnNext2 = await findByRole('button', {name: 'Next Question'})
        fireEvent.click(btnNext2)

        const title = await findByText('React Typescript Quiz')
        expect(title).toBeInTheDocument()
    })


})