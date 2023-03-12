import React from 'react'

export default function Question(props){
    const {data, show, showAns, check, newSet, score, setShow} = props
    
    const attemptPage = data.map(obj => {
        const optionHtml = obj.options.map(option => {
            if(option === obj.correctAns){
                return <button className={obj.userAns === option ? 'selected' : 'option'} onClick={() => check(obj.id, option)}>{option}</button>
            }
            else{
                return <button className={obj.userAns === option ? 'selected' : 'option'} onClick={() => check(obj.id, option)}>{option}</button>
            }
        })
        
        
        return (
            <article className='qa'>
                <h5 className='question'>{obj.question}</h5>
                <div className='answers'>
                    {optionHtml}
                   
                </div>
            </article>
        )
    })
    
    const resultPage = data.map(obj => {
        const optionHtml = obj.options.map(option => {
            if(option === obj.correctAns){
                return <button className={obj.isCorrect ? 'done' : 'correct'} >{option}</button>
            }
            else{
                return <button className={obj.userAns === option ? 'incorrect' : 'option'} >{option}</button>
            }
        })
        return (
            <article className='qa'>
                <h5 className='question'>{obj.question}</h5>
                <div className='answers'>
                    {optionHtml}
                   
                </div>
            </article>
        )
    })
    
    // console.log(resultPage)
    
    return (
        <section className='qpage'>
        {
            show ?
            <div className='qarea'>
            {resultPage}
            <div className='next'>
            <p className='score'>Your Score is: <span className={score() > 0 ? 'green' : 'red'}>{score()}</span></p>
            <button className='btn2' onClick={showAns}>Start Again</button>
            </div>
            </div>
        
            :
         <div className='qarea'>
            {attemptPage}
            <div className='next'>
            <button className='btn2' onClick={() => setShow(true)}>Submit Answers</button>
            </div>
            </div>
        }
        </section>
    )
}