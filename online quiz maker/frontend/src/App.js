import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import QuizList from './components/QuizList';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<QuizList/>} />
          <Route path="/create" element={<CreateQuiz/>} />
          <Route path="/take/:id" element={<TakeQuiz/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


