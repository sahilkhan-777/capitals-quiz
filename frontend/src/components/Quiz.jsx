import { useEffect, useState, useRef } from "react";

function Quiz() {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const inputRef = useRef();

  function focusInput() {
    inputRef.current.focus();
  }

  useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch("https://capitals-quiz-y6eo.onrender.com");
      const data = await response.json();
      setQuestion(data);
    }

    fetchQuestion();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    console.log("User Answer:", answer);
    console.log("Correct Answer:", question[index].capital);
    if (index < question.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setAnswer("");
    }

    if (answer.toLowerCase() === question[index].capital.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setMessage("Correct!");
      setTimeout(() => {
        setMessage("");
      }, 1000);
    } else {
      setMessage(`Incorrect! The correct answer is ${question[index].capital}`);
      setTimeout(() => {
        setMessage("");
      }, 1000);
    }
  }

  if (question.length === 0) {
    return <h2 className="loading-text">Loading...</h2>;
  }

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <h1 className="question-country" onClick={focusInput}>
        {question[index].country}
      </h1>
      <p className="score">Score: {score}</p>
      <p className="message">{message}</p>
      <input
        type="text"
        placeholder="Enter the capital"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        ref={inputRef}
        required
      />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

export default Quiz;
