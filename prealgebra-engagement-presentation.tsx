import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-2 text-left border rounded ${
              selectedAnswer === option
                ? option === correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <Alert className="mt-4">
          <AlertTitle>
            {selectedAnswer === correctAnswer ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            {selectedAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
          </AlertTitle>
          <AlertDescription>
            {selectedAnswer === correctAnswer
              ? "Great job! You've got it right."
              : `The correct answer is ${correctAnswer}. Try again!`}
          </AlertDescription>
        </Alert>
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Interactive Prealgebra Learning Modules</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Visualizing Quadratic Functions</h2>
        <p className="mb-4">
          Let's explore the graph of y = x². This parabola shows how the output (y) changes as the input (x) increases or decreases.
        </p>
        <div className="h-80 w-full">
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
        <p className="mt-4">
          Notice how the graph is symmetrical around the y-axis and always stays above or on the x-axis.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Quiz: Basic Algebra Concepts</h2>
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
        <p className="mt-4">
          Quiz Score: {quizScore} / {questionAnswered}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Real-world Applications</h2>
        <p>
          Prealgebra concepts are used in various real-world scenarios. Here are a few examples:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
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
