// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState('');
  const [c1, setC1] = useState('EUR');
  const [c2, setC2] = useState('USD');
  const [output, setOutPut] = useState();

  useEffect(
    () => {
      async function fetchData() {
        try {
          const response = await fetch(`https://api.frankfurter.app/latest?amount=100&from=${c1}&to=${c2}`);
          const data = await response.json();
          setOutPut((data.rates[c2] / 100 * input).toFixed(2));
        }
        catch (error) { console.log('rates error'); }
      }
      fetchData();
    }, [c1, c2, input]
  )

  return (
    <div>
      <input type="text" value={input} onChange={
        (e) => { setInput(e.target.value) }
      } />
      <select value={c1} onChange={
        (e) => { setC1(e.target.value) }}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={c2} onChange={
        (e) => { setC2(e.target.value) }}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {
          c1 === c2 ? input : output
        }
      </p>
    </div>
  );
}
