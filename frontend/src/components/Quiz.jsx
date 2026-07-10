import { useEffect, useState } from "react";

function Quiz() {
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState("");
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchQuestion() {
            const response = await fetch("http://localhost:3000/");
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

        if( answer.toLowerCase() === question[index].capital.toLowerCase()) {
            setScore((prevScore) => prevScore + 1);
            setMessage("Correct!");
        }
        else{
            setMessage(`Incorrect! The correct answer is ${question[index].capital}`);
        }
    }

    if (question.length === 0) {
        return <h2>No questions available</h2>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{question[index].country}</h1>
            <p>Score: {score}</p>
            <p>{message}</p>
            <input
                type="text"
                placeholder="Enter the capital"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <button type="submit">
                Submit
            </button>
        </form>
    );
}

export default Quiz;