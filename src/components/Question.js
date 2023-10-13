import React, { useEffect, useState } from 'react'

const Question = ({ cardDetails }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(15);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const currentQuestion = cardDetails[currentIndex];

    useEffect(() => {
        if (quizCompleted) {
            return;
        }

        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                if (currentIndex < cardDetails.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                    setSelectedOption(null);
                    setTimeLeft(15);
                } else {
                    setQuizCompleted(true);
                }
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [currentIndex, timeLeft, quizCompleted]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        if (option === currentQuestion.answer) {
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIncorrectAnswers(incorrectAnswers + 1);
        }

        if (currentIndex < cardDetails.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setTimeLeft(15);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setSelectedOption(null);
        setTimeLeft(15);
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setQuizCompleted(false);
    };

    const renderResultPage = () => (
        <div className="info_box activeInfo">
            <div className="info-title"><span>Quiz Completed </span></div>
            <div className="info-list">
                <div className="info">Correct Answers 🥰🥰     <span> ({correctAnswers} )</span></div>
                <div className="info">Incorrect Answers  😭😭    <span> ({incorrectAnswers})</span></div>
                <div className="info">🎉 🎉Congruations 🎉 🎉 🎉</div>
            </div>
            <div className="buttons">
                <button className="quit" >Exit Quiz</button>
                <button className="restart" onClick={resetQuiz}>Continue</button>
            </div>
        </div>
    );

    if (quizCompleted) {
        return renderResultPage();
    }

    return (
        <>
            <div className="quiz_box activeQuiz">
                {cardDetails.length === 0 ?
                    <>
                        No Question 
                    </> : <>
                        <header>
                            <div className="title">Awesome Quiz Application</div>
                            <div className="timer">
                                <div className="time_left_txt">Time Left</div>
                                <div className="timer_sec">{timeLeft}</div>
                            </div>
                            <div className="time_line"></div>
                        </header>
                        <section>
                            <div className="que_text">
                                <span>{currentQuestion.question}</span>
                            </div>
                            <div className="option_list">
                                {currentQuestion.options.map((option, index) => (
                                    <div
                                        className={`option ${selectedOption === option ? 'selected' : ''}`}
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <footer>
                            <div className="total_que"></div>
                            {currentIndex < cardDetails.length - 1 ? (
                                <button className="next_btn" onClick={() => setCurrentIndex(currentIndex + 1)}>
                                    Next Que
                                </button>
                            ) : (
                                <p>All questions completed</p>
                            )}
                        </footer>
                    </>}

            </div>
        </>
    )
}

export default Question

