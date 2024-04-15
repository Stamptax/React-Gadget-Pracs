import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setIsOpen] = useState(null);

  return <div className="accordion">
    {
      data.map((i, n) => (<AccordionItem curOpen={curOpen} onOpen={setIsOpen} num={n} title={i.title} text={i.text} key={i.title} />))
    }
  </div>;
}

function AccordionItem({ num, title, text, curOpen, onOpen }) {
  const isOpen = num === curOpen;

  function handleClick() {
    //setIsOpen(!isOpen)
    curOpen === num ? onOpen(!num) : onOpen(num);
  }

  return (
    <div className={`item   ${isOpen ? 'open' : ''}  `} onClick={handleClick}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">
        {isOpen ? '—' : '+'}
      </p>
      {
        isOpen && <p className="content-box">{text}</p>
      }

    </div>
  )
}