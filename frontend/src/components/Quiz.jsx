import { useEffect, useState } from "react";

function Quiz() {
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState("");

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
        console.log("Correct Answer:", question.capital);
    }

    if (!question) {
        return <h2>Loading...</h2>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{question.country}</h1>

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