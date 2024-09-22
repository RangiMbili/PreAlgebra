import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

const data = [
  { x: -3, y: 9 },
  { x: -2, y: 4 },
  { x: -1, y: 1 },
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
];

const QuizQuestion = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    onAnswer(answer === correctAnswer);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{question}</h3>
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            style={{
              width: '100%',
              padding: '0.5rem',
              textAlign: 'left',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              backgroundColor: selectedAnswer === option
                ? option === correctAnswer
                  ? '#d4edda'
                  : '#f8d7da'
                : 'white',
            }}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem',
          backgroundColor: selectedAnswer === correctAnswer ? '#d4edda' : '#f8d7da',
          borderRadius: '4px',
        }}>
          <p style={{ fontWeight: 'bold' }}>
            {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
          </p>
          <p>
            {selectedAnswer === correctAnswer
              ? "Great job! You've got it right."
              : `The correct answer is ${correctAnswer}. Try again!`}
          </p>
        </div>
      )}
    </div>
  );
};

const InteractivePrealgebraModules = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(0);

  const handleQuizAnswer = (isCorrect) => {
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }
    setQuestionAnswered(questionAnswered + 1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Interactive Prealgebra Learning Modules</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>1. Visualizing Quadratic Functions</h2>
        <p style={{ marginBottom: '1rem' }}>
          Let's explore the graph of y = x². This parabola shows how the output (y) changes as the input (x) increases or decreases.
        </p>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p style={{ marginTop: '1rem' }}>
          Notice how the graph is symmetrical around the y-axis and always stays above or on the x-axis.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>2. Quiz: Basic Algebra Concepts</h2>
        <QuizQuestion
          question="What is the value of x in the equation 2x + 5 = 13?"
          options={["3", "4", "5", "6"]}
          correctAnswer="4"
          onAnswer={handleQuizAnswer}
        />
        <QuizQuestion
          question="Which of the following is a linear equation?"
          options={["y = x²", "y = 2x + 1", "y = 1/x", "y = √x"]}
          correctAnswer="y = 2x + 1"
          onAnswer={handleQuizAnswer}
        />
        <p style={{ marginTop: '1rem' }}>
          Quiz Score: {quizScore} / {questionAnswered}
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>3. Real-world Applications</h2>
        <p>
          Prealgebra concepts are used in various real-world scenarios. Here are a few examples:
        </p>
        <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Calculating discounts during shopping</li>
          <li>Estimating travel time based on speed and distance</li>
          <li>Adjusting recipe ingredients for different serving sizes</li>
          <li>Budgeting monthly expenses</li>
        </ul>
      </section>
    </div>
  );
};

export default InteractivePrealgebraModules;
