import React from 'react';

interface CongratsProps {
  score: number;
  correct: number;
  incorrect: number;
}

const Congrats: React.FC<CongratsProps> = ({ score, correct, incorrect }) => {
  const containerStyle = {
    textAlign: 'center' as const,
    marginBottom: '20px',
  };

  const scoreBarStyle = {
    position: 'relative' as const,
    height: '24px',
    backgroundColor: '#e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden' as const,
    margin: '10px 0',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const scoreFillStyle = {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: '12px',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    color: 'white',
    fontWeight: 'bold' as const,
    width: `${score}%`,
  };

  const scorePercentageStyle = {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#fff',
  };

  const answersSummaryStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  };

  const correctStyle = {
    color: 'green',
    fontWeight: 'bold' as const,
  };

  const incorrectStyle = {
    color: 'red',
    fontWeight: 'bold' as const,
  };

  return (
    <div style={containerStyle}>
      <h2>Congratulations! You've completed the &lt;name of the block&gt; block!</h2>
      <p>Your score:</p>
      <div style={scoreBarStyle}>
        <div style={scoreFillStyle}>
          <span style={scorePercentageStyle}>{score}%</span>
        </div>
      </div>
      <div style={answersSummaryStyle}>
        <p>Correct: <span style={correctStyle}>{correct}</span></p>
        <p>Incorrect: <span style={incorrectStyle}>{incorrect}</span></p>
      </div>
    </div>
  );
};

export default Congrats;
