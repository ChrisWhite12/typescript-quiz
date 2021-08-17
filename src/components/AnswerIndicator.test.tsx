import AnswerIndicator from "./AnswerIndicator"
import { render, screen } from '@testing-library/react'

describe("AnswerIndicator test", () => {
    it('should render a tick if correct is true', () => {
        render(<AnswerIndicator correct={true} />)
        const comp = screen.getByTestId('svg')
        expect(comp.dataset.correct).toBe('true')
    })

    it('should render a cross when incorrect', () => {
        render(<AnswerIndicator correct={false} />)
        const comp = screen.getByTestId('svg')
        expect(comp.dataset.correct).toBe('false')
    })
})