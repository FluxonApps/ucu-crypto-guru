import React, { useState, useEffect } from 'react';
import { Box, Button, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const db = getFirestore();

interface Question {
  id: string;
  correct_answer: boolean;
  question: string;
}

const QuestionBlock: React.FC = () => {
  const [user] = useAuthState(getAuth());
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsCollection = collection(db, 'blocks', id, 'test');
      const questionsSnapshot = await getDocs(questionsCollection);
      const questionsData = questionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        correct_answer: doc.data().correct_answer,
        question: doc.data().question,
      }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, [id]);

  const handleAnswerChange = (id: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  const handleSubmit = async () => {
    // Calculate the score
    let score = 0;
    questions.forEach((question) => {
      if ((answers[question.id] === 'True' && question.correct_answer) || (answers[question.id] === 'False' && !question.correct_answer)) {
        score++;
      }
    });
    setScore(score);

    // Update the user's marks in Firestore
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        [`testScores.${id}`]: score,
      });
    }

    toast({
      title: 'Quiz Submitted',
      description: `Your score: ${score}/${questions.length}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} maxW="container.md" mx="auto">
      <Text fontFamily="Helvetica" fontSize={22} fontWeight="bold">
        Quiz
      </Text>
      {questions.map((question) => (
        <Box key={question.id} p={4} my={4} borderWidth="1px" borderRadius="lg" backgroundColor='#FCCFBF'>
          <Text fontWeight='bold'>{question.question}</Text>
          <RadioGroup
            onChange={(value) => handleAnswerChange(question.id, value)}
            value={answers[question.id] || ''}
          >
            <Stack direction="row">
              <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      ))}
      <Button colorScheme="orange" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default QuestionBlock;
