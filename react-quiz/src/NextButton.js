import { type } from '@testing-library/user-event/dist/type';
import React from 'react'

export default function NextButton({ dispatch, answer, index, numQuestions }) {
    if (answer === null) return null;
    if (index < numQuestions - 1)
        return (
            <buton className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })} >Next</buton>
        )
    if (index === numQuestions - 1)
        return (
            <buton className="btn btn-ui" onClick={() => dispatch({ type: 'finished' })} >Finish</buton>
        )
}
