import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quizzes', { title, questions });
      alert('Quiz created successfully!');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  return (
    <div className="create-quiz">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[qIndex].question = e.target.value;
                setQuestions(newQuestions);
              }}
              required
            />
            {q.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].options[oIndex] = e.target.value;
                  setQuestions(newQuestions);
                }}
                required
              />
            ))}
            <select
              value={q.correctAnswer}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[qIndex].correctAnswer = parseInt(e.target.value);
                setQuestions(newQuestions);
              }}
              required
            >
              {q.options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
}

export default CreateQuiz;