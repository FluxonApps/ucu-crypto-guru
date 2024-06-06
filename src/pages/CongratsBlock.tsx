import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Text } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

const CongratsBlock: React.FC = () => {
  const [user] = useAuthState(getAuth());
  const { id } = useParams<{ id: string }>();
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        if (userData && userData.testScores && userData.testScores[id]) {
          setScore(userData.testScores[id]);
        }
      }
    };

    fetchScore();
  }, [user, id]);

  if (score === null) {
    return <div>Loading...</div>;
  }

  const totalQuestions = 100; // This should be dynamically set based on your actual total questions
  const correct = Math.round((score / 100) * totalQuestions);
  const incorrect = totalQuestions - correct;

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
      <Text fontSize="md" mb={4}>Congratulations! You've completed the &lt;name of the block&gt; block!</Text>
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

export default CongratsBlock;
