import RootLayout from '@/components/Layouts/RootLayout';
import { useGetExamQuestionQuery } from '@/redux/features/quizz/examQuizzApi';
import { shuffleArray } from '@/utils/suffleArray';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useReducer, useState } from 'react';

const ExamQuestionPage = () => {
    
    const router=useRouter()
    const [quesNo,setQuesNo]=useState(0)
    const {data:quizzesData,isError,isLoading,error}=useGetExamQuestionQuery(router.query.id);
    const quizzes= quizzesData?.data;
    //console.log(quizzes);
    const [performerAnser,setPerformerAnswer]=useState<string>("");
    const [correctAnswer,setCorrectAnswer]=useState<number>(0);

    //console.log(performerAnser);



   const handleSubmit=(performerAnser:String,answers:string[])=>{
    setQuesNo(quesNo=>quesNo+1);
    if(performerAnser===answers[0]){
      setCorrectAnswer(correctAnswer=>correctAnswer+1);
    }
     if(quesNo===9){
      console.log(quesNo,correctAnswer);
      const options={
        
      }
     }
    
   }


    return (
        <div>
            <h1>Hello Quizz</h1>
          <div>
          {
              quizzes?.length>0 && (
              <div>
                 <h2 className='text-xl font-bold'>{quizzes[quesNo]?.question}</h2>
                {/*  <div>
                 <input type="radio" id={quizzes[0].options[0]} name={quizzes[0].id} value={quizzes[0].options[0]}/>
                  <label htmlFor={quizzes[0].options[0]}>{quizzes[0].options[0]}</label><br />
                 <input type="radio" id={quizzes[0].options[1]} name={quizzes[0].id} value={quizzes[0].options[1]}/>
                  <label htmlFor={quizzes[0].options[1]}>{quizzes[0].options[1]}</label><br />
                 <input type="radio" id={quizzes[0].options[2]} name={quizzes[0].id} value={quizzes[0].options[2]}/>
                  <label htmlFor={quizzes[0].options[2]}>{quizzes[0].options[2]}</label><br />
                 <input type="radio" id={quizzes[0].options[3]} name={quizzes[0].id} value={quizzes[0].options[3]}/>
                  <label htmlFor={quizzes[0].options[3]}>{quizzes[0].options[3]}</label><br />
                 </div> */}

                 {
                  quizzes[quesNo]?.options?.map((option:string,index:number)=>(
                     <div key={index}>
                     <input onClick={(e:React.FormEvent<HTMLInputElement>)=>setPerformerAnswer(e.currentTarget.value )}  type="radio" id={option} name={quizzes[quesNo].id} value={option}/>
                      <label htmlFor={option}>{option}</label><br />
                     </div>
                  ))
                 }

{/* {
                  optionsQ?.map((option:string,index:number)=>(
                     <div key={index}>
                     <input onClick={(e:React.FormEvent<HTMLInputElement>)=>setPerformerAnswer(e.currentTarget.value )}  type="radio" id={option} name={quizzes[quesNo].id} value={option}/>
                      <label htmlFor={option}>{option}</label><br />
                     </div>
                  ))
                 } */}
              </div>
            )
           }
          </div>
          <button onClick={()=>handleSubmit(performerAnser,quizzes[quesNo].answers)} >{quesNo===9? "Submit":"Next"}</button>
        </div>
    );
};

export default ExamQuestionPage

  ExamQuestionPage.getLayout = function getLayout(page:ReactNode) {
    return <RootLayout>{page}</RootLayout>;
  };

