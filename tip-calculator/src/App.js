import { useState } from "react"
const options = [
  { label: 'Dissatisfied (0%)', value: 0 }, { label: 'It was okay (5%)', value: 0.05 }, { label: 'It was good (10%)', value: 0.1 }, { label: 'Absolutely amazing! (20%)', value: 0.2 }
]

function BillValue({ bill, setBill }) {
  return (
    <div>
      <span>How much was the bill?</span> <input type="text" value={bill} onChange={e => setBill(e.target.value)} />
    </div>
  )
}

function Rating({ text, options, setFunc, value }) {
  return (
    <div>
      <span>{text}</span>
      <select value={value} onChange={e => setFunc(e.target.value)} >
        {options.map((i) => <option value={i.value} key={i.label}>{i.label}</option>)}
      </select>
    </div >
  )
}

function OutComes({ bill, mysatis, msatis }) {
  const tip = (Number(mysatis) + Number(msatis)) / 2 * Number(bill);

  return (
    <div>
      {bill > 0 &&
        <><span>You pay {Math.round(Number(bill) + Number(tip))} </span>
          <span>
            (${Number(bill)}+${Math.round(Number(tip))} tip)
          </span>
        </>
      }
    </div>
  )
}

function ResetBtn({ setBill, setMysatis, setMsatis, setIsReset }) {
  return (
    <>
      <button style={{ fontSize: '2rem', padding: '10px', marginTop: '30px' }} onClick={() => (setBill(''), setMsatis(0), setMysatis(0))} >Reset</button>
    </>
  )

}


export default function App() {
  const [bill, setBill] = useState(0);
  const [mysatis, setMysatis] = useState(0);
  const [msatis, setMsatis] = useState(0);
  let output = 0;


  return (
    <div className="App">
      <BillValue setBill={setBill} bill={bill} />
      <Rating text={'How did you like the service? '} options={options} setFunc={setMysatis} value={mysatis} />
      <Rating text={'How did your friend like the service? '} options={options} setFunc={setMsatis} value={msatis} />
      <OutComes bill={bill} mysatis={mysatis} msatis={msatis} />
      <ResetBtn setBill={setBill} setMysatis={setMysatis} setMsatis={setMsatis} />
      {console.log(bill, mysatis, msatis)}
    </div>
  )
}