import React, { useEffect, useState } from 'react';
import { Text, Button } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
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
    backgroundColor: '#50C878',
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
      <Text fontSize="md" mb={4} fontWeight={'semibold'}>
        Congratulations! You've completed the block quiz!
      </Text>
      <Text fontWeight={'semibold'}>Your score:</Text>
      <div style={scoreBarStyle}>
        <div style={scoreFillStyle}>
          <span style={scorePercentageStyle}>{score}%</span>
        </div>
      </div>
      <div style={answersSummaryStyle}>
        <Text fontWeight={'semibold'}>
          Correct: <span style={correctStyle}>{correct}</span>
        </Text>
        <Text fontWeight={'semibold'}>
          Incorrect: <span style={incorrectStyle}>{incorrect}</span>
        </Text>
      </div>
      <Button as={Link} to="/main/blocks" colorScheme="orange" mt={4}>
        Back to blocks
      </Button>
    </div>
  );
};

export default CongratsBlock;
