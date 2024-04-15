import './styles.css'
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + count)


  function handileStepIncrease() {
    setStep((s) => s + 1)
  }
  function handileStepDecrease() {
    setStep((s) => s - 1)
  }


  function handileCountIncrease() {
    setCount((c) => c + step)
  }
  function handileCountDecrease() {
    setCount((c) => c - step)
  }



  return (
    <div className="App">
      <div className="stepLine">
        <input type='range' value={step} min='1' max='10' onChange={(e) => (setStep(Number(e.target.value)))}></input>
        <span>{step}</span>
      </div>
      <div className="countLine">
        <button onClick={handileCountDecrease}>-</button>
        <input type='text' value={count} onChange={(e) => (setCount(Number(e.target.value)))} ></input>
        <button onClick={handileCountIncrease}>+</button>
      </div>

      <p className="statement">{count} days from today is {currentDate.toDateString()} </p>

      <button onClick={(c, s) => { setCount((c) => c = 0); setStep((s) => s = 1) }}>Reset</button>
    </div>
  );
}

export default App;
