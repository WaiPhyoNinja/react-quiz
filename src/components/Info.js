import React, { useEffect,useState } from 'react'

import axios from 'axios';
import Quiz from './Quiz.js';
import Question from './Question.js';


const Info = ({ quizStart }) => {
    const [ quiz , setQuiz ] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10')
            .then(res => {
                setCards(res.data.results.map((item, index) => {
                    let decode_incorrect = item.incorrect_answers.map(it => decodeString(it))
                    return {
                        id: `${index}-${Date.now()}`,
                        question: decodeString(item.question),
                        answer: decodeString(item.correct_answer),
                        options: [...decode_incorrect, decodeString(item.correct_answer)]
                    }
                }))
            })
    }, [])

    function decodeString(str) {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    return (
        <div>
            <>
                { !quiz ? 
                <>
                <div className="info_box activeInfo">
                    <div className="info-title"><span>Some Rules of this Quiz</span></div>
                    <div className="info-list">
                        <div className="info">1. You will have only <span>15 seconds</span> per each question.</div>
                        <div className="info">2. Once you select your answer, it can't be undone.</div>
                        <div className="info">3. You can't select any option once time goes off.</div>
                        <div className="info">4. You can't exit from the Quiz while you're playing.</div>
                        <div className="info">5. You'll get points on the basis of your correct answers.</div>
                    </div>
                    <div className="buttons">
                        <button className="quit" onClick={() => quizStart(false)}>Exit Quiz</button>
                        <button className="restart" onClick={() => setQuiz(true)}>Continue</button>
                    </div>
                </div>
                </> : 
                <>
                       <Question cardDetails={cards} />
                </>
                }
            </>
        </div>
    )
}


export default Info
