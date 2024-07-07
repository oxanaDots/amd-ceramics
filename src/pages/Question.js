import React from 'react'

import styles from './Homepage.module.css'
import {useState} from 'react'

function Question ({questions}){
    const [curr, setCurr] = useState(null)


    function handleToggle  (i){
        setCurr((curr) => curr === i ? null : i)
        }

    return(

        questions.map((question, index) => <QuestionItem allClosed={curr === null} isOpen={index === curr} curr={curr} handleToggle={handleToggle} question={question} i={index}/>
    )

    )
}





function QuestionItem({question, i,  handleToggle, isOpen, allClosed}){

  



    return(
        <div  num={i} key={question.i} onClick={()=>handleToggle(i)} className={`${styles.question} ${allClosed ? styles.hover : '' } ${isOpen ? styles.active :  '' }`}>
        <h4 style={isOpen? {color: '#fffff'} : {}}>{question.question }<span >{isOpen? "-" : '+'}</span></h4> 
        <p style={isOpen ? {paddingBottom: '2rem'} : {}}>{isOpen ?  question.answer : null}</p></div>
    )
}

export default Question

