import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Radio, RadioGroup, Stack, Text, useToast } from '@chakra-ui/react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
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
  const [percentage, setPercentage] = useState<number | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null); // Create a ref for the top of the component

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
    // Calculate the percentage
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (
        (answers[question.id] === 'True' && question.correct_answer) ||
        (answers[question.id] === 'False' && !question.correct_answer)
      ) {
        correctAnswers++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    setPercentage(percentage);

    // Update the user's marks in Firestore
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        [`testScores.${id}`]: percentage,
      });
    }

    toast({
      title: 'Quiz Submitted',
      description: `Your score: ${percentage.toFixed(2)}%`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    // Redirect to the stats page after the toast
    setTimeout(() => {
      navigate('/block/' + id + '/stats');
    }, 1000);
  };

  return (
    <>
      <Box ref={topRef}></Box> {/* Add a reference to the top of the component */}
      <Text fontFamily="Helvetica" fontSize={22} fontWeight="bold" mx={8} my={5}>
        Quiz
      </Text>
      <Box
        className="custom-scrollbar" // Add this class
        bgColor="#F3F3F3"
        borderRadius={30}
        overflow="auto"
        p={6}
        maxW="container.md"
        mx="auto"
        height="50vh"
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#e0e0e0',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '10px',
            border: '2px solid #e0e0e0',
          },
          'scrollbar-width': 'thin',
          'scrollbar-color': '#EEA58B #F3F3F3',
        }}
      >
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
      </Box>
      <Button colorScheme="orange" onClick={handleSubmit} m={8}>
        Submit
      </Button>
    </>
  );
};

export default QuestionBlock;
