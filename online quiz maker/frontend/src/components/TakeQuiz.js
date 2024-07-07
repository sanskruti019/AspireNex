// import React, { useState, useEffect,useContext } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


// function TakeQuiz() {
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [score, setScore] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const { id } = useParams();

  

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
//         setQuiz(response.data);
//         setAnswers(new Array(response.data.questions.length).fill(null));
//       } catch (error) {
//         console.error('Error fetching quiz:', error);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const totalQuestions = quiz.questions.length;
//     const correctAnswers = quiz.questions.reduce((acc, q, index) => {
//       return acc + (q.correctAnswer === answers[index] ? 1 : 0);
//     }, 0);
//     setScore((correctAnswers / totalQuestions) * 100);
//     setSubmitted(true);
//   };

//   if (!quiz) return <div>Loading...</div>;

//   return (
//     <div className="take-quiz">
//       <h2>{quiz.title}</h2>
//       <form onSubmit={handleSubmit}>
//         {quiz.questions.map((q, qIndex) => (
//           <div key={qIndex} className="question">
//             <p>{q.question}</p>
//             {q.options.map((option, oIndex) => (
//               <label key={oIndex}>
//                 <input
//                   type="radio"
//                   name={`question-${qIndex}`}
//                   value={oIndex}
//                   checked={answers[qIndex] === oIndex}
//                   onChange={() => {
//                     const newAnswers = [...answers];
//                     newAnswers[qIndex] = oIndex;
//                     setAnswers(newAnswers);
//                   }}
//                   required
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         ))}
//         <button type="submit">Submit Quiz</button>
//       </form>
//       {score !== null && <p>Your score: {score.toFixed(2)}%</p>}
//     </div>
//   );
// }

// export default TakeQuiz;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TakeQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(null));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quiz.questions.reduce((acc, q, index) => {
      return acc + (q.correctAnswer === answers[index] ? 1 : 0);
    }, 0);
    setScore((correctAnswers / totalQuestions) * 100);
    setSubmitted(true);
  };

  const getOptionStyle = (questionIndex, optionIndex) => {
    if (!submitted) return {};
    
    const isCorrect = quiz.questions[questionIndex].correctAnswer === optionIndex;
    const isSelected = answers[questionIndex] === optionIndex;
    
    if (isCorrect) {
      return { backgroundColor: '#4caf50', color: 'white' };
    } else if (isSelected) {
      return { backgroundColor: '#f44336', color: 'white' };
    }
    
    return {};
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="take-quiz">
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="question">
            <p>{q.question}</p>
            {q.options.map((option, oIndex) => (
              <label key={oIndex} style={getOptionStyle(qIndex, oIndex)}>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={oIndex}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => {
                    if (!submitted) {
                      const newAnswers = [...answers];
                      newAnswers[qIndex] = oIndex;
                      setAnswers(newAnswers);
                    }
                  }}
                  disabled={submitted}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        {!submitted && <button type="submit">Submit Quiz</button>}
      </form>
      {score !== null && <p className="score">Your score: {score.toFixed(2)}%</p>}
    </div>
  );
}

export default TakeQuiz;