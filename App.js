import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'

export default function App(){
    const [rawData, setRawData] = React.useState([])
    const [data, setData] = React.useState([])
    const [show, setShow] = React.useState(false)
    
    React.useEffect(() => {
        setData(rawData.length > 0 ? modifyRawData() : [])
    }, [rawData])
    
    
    
    function newSet() {
        fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=medium&type=multiple')
            .then(res => res.json())
            .then(data => setRawData(data.results))
            }
    
    
    function showAns(){
        setShow(false)
        newSet()
    }
    
    function score(){
        let score = 0
        data.forEach(obj => {
            if(obj.userAns){
                if(obj.userAns === obj.correctAns){
                    score += 1
                }
                else{
                    score -= 0.25
                }
            }
        })
        return score
    }
    
    function checkAns(inputId, inputAns){
        setData(prevdata => {
            return prevdata.map(data => {
                if(data.id === inputId){
                    if(data.userAns != inputAns){
                        data.userAns = inputAns
                    }
                    else{
                       data.userAns = '' 
                    }
                    
                    if(data.correctAns === data.userAns){
                        return {...data, isCorrect: true}
                    }
                    else{
                        return {...data, isCorrect: false}
                    }
                    
                    
                    
                }
                else{
                    return data
                }
            })
        })
    }
    
    // console.log(data)
    
    
    function modifyRawData(){
        const newData = rawData.map(data => {
            let options = [...data.incorrect_answers]
            const randomNumber = Math.floor(Math.random() * 4)
            options.splice(randomNumber, 0, data.correct_answer)
            return {
                question: data.question,
                correctAns: data.correct_answer,
                options: options,
                isCorrect: false,
                userAns: '',
                id: nanoid(),
            }
        })
        return newData
    }
    
    // console.log(data)
    
    return (
        <main>
        {rawData.length === 0
         ?
            <section className='intro'>
                <h1>Quizzical</h1>
                <p>Play With Us</p>
                <button className='btn1' onClick={newSet}>Start Quiz</button>
                <p className='rule'>Get 1 score for each correct answer and -0.25 for each wrong answer</p>
            </section>
         :
            <Question data={data} show={show} setShow={setShow} score={score} showAns={showAns} check={checkAns} newSet={newSet}/>
        }
        </main>
        
                // <h1>Quizzical</h1>
        
    )
}