import { useState, useEffect } from 'react';
import './App.css';
import './background.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// UseEffect:
// 1. Initial:
// PURPOSE: Component shru hotay hi koi kaam karwana.
// e.g.: API call karwana, ya or koi initial logical kaam karwana.
// Kab Chalega: 1st Render ke baad.
/*
    useEffect(()=> {

    },[])
    [] => dependency list
*/
// 2. Updation:
// 3. Unmount:

// APP jab bhi crash hoti hai, mostly issue API ka hi hota hai. Inspect mai network ke ander Fetch/HXR mai check karna chahiye.

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentQue, setcurrentQue] = useState(0);
    const [selAns, setSelAns] = useState(null);
    const [score, setScore] = useState(0);
    const [Finish, setfinish] = useState(true);
    const [quizStart, setQuizStart] = useState(true);
    const [disBtn, setdisBtn] = useState(false);
    const [time, setTime] = useState(30);

    useEffect(function () {
        fetchQuestions()
    }, [])

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (time > 0) {
                setTime(prevTime => prevTime - 1);
            }
        }, 1000)
        return () => clearInterval(timeInterval)
    }, [time])

    if (time == 0) { next() };

    function fetchQuestions() {
        fetch('https://the-trivia-api.com/v2/questions')
            .then(res => res.json())
            .then(res => {
                res.map(function(item){
                    item.options = [item.correctAnswer, ...item.incorrectAnswers];
                    item.options = shuffle(item.options);
                })
                setQuestions(res);
            })
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function start() {
        setQuizStart(false);
        setTime(30);
        setcurrentQue(0);
    }

    function next() {
        currentQue !== questions.length - 1 ? setcurrentQue(currentQue + 1) : finish();
        if (selAns === questions[currentQue].correctAnswer) {
            setScore(score + 10);
        }
        setSelAns(null);
        setdisBtn(false);
        setTime(30);
    }

    function restart() {
        setcurrentQue(0);
        setfinish(true);
        setScore(0);
        setdisBtn(false);
        setQuizStart(true);
        setTime(-1)
    }

    function getAnswer(e) {
        setSelAns(e.target.value);
        setdisBtn(true);
    }

    function finish() {
        setfinish(false);
        if (selAns === questions[currentQue].correctAnswer) {
            setScore(score + 10);
        }
    }

    if (!questions.length) {
        return <div>Loading...</div>
    }

    const isLastQuestion = currentQue === questions.length - 1;

    return (
        <div className='App'>
            <header className='App-header'>
                {quizStart ?
                    (
                        <div className='top_start_div'>
                            <h1>Quiz</h1>
                            <h3>Let's check your Knowledge.</h3>
                            <p style={{margin: '50px 0px'}}>You have 30 seconds for each question. If you select correct answer, you will get 10 points. Total questions are 10.</p>
                            <button onClick={start} className='quiz_btn'>Start</button>
                        </div>
                    )
                    :
                    (
                        <div style={{height: '100%'}}>
                            {Finish ? (
                                <div className='main_div'>
                                    <span>Time Remaining: {time < 10 ? '0' + time : time}</span>
                                    <div className='quiz_que_div'>
                                        <h3 className='que_head'>{currentQue + 1}) {questions[currentQue].question.text}</h3>
                                        {questions[currentQue].options.map((item) => {
                                            return <label className={`quiz_label ${selAns === item ? 'label_clicked' : ''}`}> <input onChange={getAnswer} type='radio' checked={selAns === item} name={currentQue} value={item} /> {item}</label>
                                        })}
                                        <h4 className='bottom_h4'>{currentQue + 1}/10</h4>
                                    </div>
                                    <div className='quiz_btn_div'>
                                        {isLastQuestion ? (
                                            <button onClick={finish} disabled={!disBtn} className='quiz_btn'>Finish</button>
                                        ) : (<button onClick={next} disabled={!disBtn} className='quiz_btn'>Next<FontAwesomeIcon icon="fa-solid fa-angle-right" /></button>)
                                        }
                                    </div>
                                </div>) : (
                                <div className='bottom_score_div'>
                                    <div>
                                    <h2>Your Score is {score}/100.</h2>
                                    {score < 50 ? 
                                    <h3 className='Bad_remarks'>Better luck next time.</h3> 
                                    : <h3 className='Good_remarks'>Good Effort!</h3> }
                                    <button onClick={restart} className='quiz_btn' >Restart</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
            </header>
        </div>
    )
}
export default App;
