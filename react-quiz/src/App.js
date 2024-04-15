import { useEffect, useReducer } from "react";
import Loader from './Loader';
import Error from './Error';
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null
}

const SEC_PER_Q = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case 'dataFailed':
      return {
        ...state,
        status: "error"
      }
    case 'start':
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * SEC_PER_Q
      }
    case 'restart':
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        seconds: state.questions.length * SEC_PER_Q
      }

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }

    case 'nextQuestion':
      return {
        ...state,
        index: (state.index + 1) < state.questions.length ? state.index + 1 : state.index,
        answer: null
      }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case 'tick':
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? 'finished' : state.status
      }
    default:
      throw new Error('Unkown Error');
  }


}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, highscore, seconds } = state;
  console.log(state);
  useEffect(
    function () {
      fetch('http://localhost:9000/questions')
        .then(response => response.json())
        .then(data => dispatch({ type: 'dataReceived', payload: data }))
        .catch((error) => dispatch({ type: 'dataFailed' }))
    }, []
  )

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {
          status === 'loading' && <Loader />
        }
        {
          status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        }
        {
          status === 'error' && <Error />
        }
        {
          status === 'active' && <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer} />
            <Questions question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} seconds={seconds} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        }
        {
          status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch} />
        }
      </Main>
    </div>
  );
}

export default App;
