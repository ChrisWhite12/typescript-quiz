import { Cancel, CheckCircle } from '@material-ui/icons'
import React from 'react'

interface Props {
    correct: boolean
}

const AnswerIndicator: React.FC<Props> = ({correct}) => {
    
    return (
        <div>
         {correct ? <CheckCircle data-correct={true} data-testid='svg' color='primary' /> : <Cancel data-correct={false} data-testid='svg' color='error' /> }
        </div>
    );
};

export default AnswerIndicator