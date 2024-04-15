import { useState } from 'react';
import './App.css';


function Button({ colour, backgrounColour, onClick, children }) {
  return (
    <button onClick={onClick} style={{ backgroundColor: backgrounColour, color: colour }}>{children}</button>
  )
}

function StepMessage({ step, children }) {
  return (
    <p className='message'>
      <h3>Step {step}</h3>
      {children}
    </p>
  )
}

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  function handlePrevious() {
    step > 1 ? setStep((s) => (s - 1)) : setStep(step)
    {/* if (step > 1) {
      setStep(step - 1);
    }
    else {
      setStep(step)
    } */ }

  }
  function handleNext() {
    step < 3 ? setStep((s) => (s + 1)) : setStep(step)
    { /* if (step < 3) {
      
      setStep(step + 1);
    }
    else {
      setStep(step)
    } */ }

  }



  return (
    <>
      <button className='close' onClick={() => (isOpen ? setIsOpen((io) => io = false) : setIsOpen((io) => io = true))}>&times;</button>

      {isOpen && (<div className="steps">
        <div className='numbers'>
          <div className={step >= 1 ? 'active' : ""}>1</div>
          <div className={step >= 2 ? 'active' : ""}>2</div>
          <div className={step >= 3 ? 'active' : ""}>3</div>
        </div>

        <StepMessage step={step}>{messages[step - 1]}</StepMessage>
        <StepMessage step={step}>Reusability Test</StepMessage>

        <div className='buttons'>
          <Button colour={'white'} backgrounColour={'blue'} onClick={handlePrevious} ><span>👈</span>Previous</Button>
          <Button colour={'white'} backgrounColour={'blue'} onClick={handleNext}  >Next<span>👉</span></Button>
        </div>
      </div >)
      }
    </>
  );
}

export default App;
